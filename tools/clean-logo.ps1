param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,

  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Bitmap]::FromFile($InputPath)
$cropBottom = [Math]::Min(650, $source.Height)
$minX = $source.Width
$minY = $cropBottom
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $cropBottom; $y++) {
  for ($x = 0; $x -lt $source.Width; $x++) {
    $color = $source.GetPixel($x, $y)
    $luminance = ($color.R + $color.G + $color.B) / 3
    if ($color.A -gt 16 -and $luminance -gt 225) {
      $minX = [Math]::Min($minX, $x)
      $minY = [Math]::Min($minY, $y)
      $maxX = [Math]::Max($maxX, $x)
      $maxY = [Math]::Max($maxY, $y)
    }
  }
}

$padding = 24
$left = [Math]::Max(0, $minX - $padding)
$top = [Math]::Max(0, $minY - $padding)
$right = [Math]::Min($source.Width - 1, $maxX + $padding)
$bottom = [Math]::Min($cropBottom - 1, $maxY + $padding)
$width = $right - $left + 1
$height = $bottom - $top + 1

$clean = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $height; $y++) {
  for ($x = 0; $x -lt $width; $x++) {
    $color = $source.GetPixel($left + $x, $top + $y)
    $luminance = ($color.R + $color.G + $color.B) / 3
    $edgeAlpha = [Math]::Max(0, [Math]::Min(255, (($luminance - 218) / 30) * 255))
    $alpha = [int](($color.A / 255) * $edgeAlpha)
    $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
  }
}

$clean.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$source.Dispose()
$clean.Dispose()

Write-Output "Created $OutputPath ($width x $height)"
