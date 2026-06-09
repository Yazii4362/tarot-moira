param(
    [string]$Src = "C:\Users\EZEN_21\.cursor\projects\c-Users-EZEN-21-Desktop-GitHub-tarot-moira\assets\c__Users_EZEN_21_AppData_Roaming_Cursor_User_workspaceStorage_df15b93cd34b3c86df70f12819c52c06_images_image-15680ef6-1395-47ee-9711-3e4ae7340093.png",
    [string]$OutDir = "public\images\wawa",
    [int]$WhiteThreshold = 240,
    [int]$Padding = 24
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }

$bmp = New-Object System.Drawing.Bitmap($Src)
$w = $bmp.Width; $h = $bmp.Height
"Source: $w x $h"

# === 1) 알파 매트 (흰 배경 -> 투명) + 비흰색 마스크 동시 생성 ===
$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$srcLock = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$srcStride = $srcLock.Stride
$srcBytes = New-Object byte[] ($srcStride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($srcLock.Scan0, $srcBytes, 0, $srcBytes.Length)
$bmp.UnlockBits($srcLock)
$bmp.Dispose()

# 비흰색 마스크 (1=캐릭터, 0=배경)
$mask = New-Object byte[] ($w * $h)
$rgbaBytes = New-Object byte[] ($srcStride * $h)

for ($y = 0; $y -lt $h; $y++) {
    $rowOff = $y * $srcStride
    $maskOff = $y * $w
    for ($x = 0; $x -lt $w; $x++) {
        $i = $rowOff + $x * 4
        $b = $srcBytes[$i]
        $g = $srcBytes[$i + 1]
        $r = $srcBytes[$i + 2]
        $isWhite = ($r -ge $WhiteThreshold -and $g -ge $WhiteThreshold -and $b -ge $WhiteThreshold)
        if ($isWhite) {
            $rgbaBytes[$i] = 0
            $rgbaBytes[$i + 1] = 0
            $rgbaBytes[$i + 2] = 0
            $rgbaBytes[$i + 3] = 0
        }
        else {
            $rgbaBytes[$i] = $b
            $rgbaBytes[$i + 1] = $g
            $rgbaBytes[$i + 2] = $r
            $rgbaBytes[$i + 3] = 255
            $mask[$maskOff + $x] = 1
        }
    }
}

# === 2) RGBA 비트맵 (페어용) ===
$rgba = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstLock = $rgba.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
[System.Runtime.InteropServices.Marshal]::Copy($rgbaBytes, 0, $dstLock.Scan0, $rgbaBytes.Length)
$rgba.UnlockBits($dstLock)

# === 3) 컬럼별 캐릭터 픽셀 카운트로 좌우 분리 지점 찾기 ===
$colCount = New-Object int[] $w
for ($x = 0; $x -lt $w; $x++) {
    $c = 0
    for ($y = 0; $y -lt $h; $y++) {
        if ($mask[$y * $w + $x] -eq 1) { $c++ }
    }
    $colCount[$x] = $c
}

# 가운데(40~60%) 영역에서 가장 빈 컬럼을 찾음
$mid1 = [int]($w * 0.40)
$mid2 = [int]($w * 0.60)
$splitX = $mid1
$minCount = [int]::MaxValue
for ($x = $mid1; $x -le $mid2; $x++) {
    if ($colCount[$x] -lt $minCount) {
        $minCount = $colCount[$x]
        $splitX = $x
    }
}
"Split column: $splitX (min count: $minCount)"

# === 4) bbox 함수 ===
function Get-BoundingBox($mask, $w, $h, $xStart, $xEnd) {
    $minX = $xEnd; $maxX = $xStart
    $minY = $h; $maxY = -1
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = $xStart; $x -lt $xEnd; $x++) {
            if ($mask[$y * $w + $x] -eq 1) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    return @{ MinX = $minX; MaxX = $maxX; MinY = $minY; MaxY = $maxY }
}

$angelBox = Get-BoundingBox $mask $w $h 0 $splitX
$demonBox = Get-BoundingBox $mask $w $h $splitX $w
$pairBox = Get-BoundingBox $mask $w $h 0 $w

"Angel bbox: $($angelBox.MinX),$($angelBox.MinY) -> $($angelBox.MaxX),$($angelBox.MaxY)"
"Demon bbox: $($demonBox.MinX),$($demonBox.MinY) -> $($demonBox.MaxX),$($demonBox.MaxY)"
"Pair bbox:  $($pairBox.MinX),$($pairBox.MinY) -> $($pairBox.MaxX),$($pairBox.MaxY)"

# === 5) 패딩 적용해서 자르고 저장 ===
function Save-Crop($srcBmp, $box, $padding, $outPath, $w, $h) {
    $x1 = [Math]::Max(0, $box.MinX - $padding)
    $y1 = [Math]::Max(0, $box.MinY - $padding)
    $x2 = [Math]::Min($w - 1, $box.MaxX + $padding)
    $y2 = [Math]::Min($h - 1, $box.MaxY + $padding)
    $cw = $x2 - $x1 + 1
    $ch = $y2 - $y1 + 1
    $crop = New-Object System.Drawing.Bitmap($cw, $ch, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($crop)
    $g.DrawImage($srcBmp, (New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)), $x1, $y1, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $crop.Dispose()
    "Saved: $outPath ($cw x $ch)"
}

$pairOut = Join-Path $OutDir "wawa-pair.png"
$angelOut = Join-Path $OutDir "wawa-angel.png"
$demonOut = Join-Path $OutDir "wawa-demon.png"

Save-Crop $rgba $pairBox $Padding $pairOut $w $h
Save-Crop $rgba $angelBox $Padding $angelOut $w $h
Save-Crop $rgba $demonBox $Padding $demonOut $w $h

$rgba.Dispose()
"Done."
