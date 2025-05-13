# PowerShell script to fix page files in Next.js App Router structure
$ErrorActionPreference = "Stop"

# Define the base paths
$basePath = Join-Path $PSScriptRoot "src" "app"
$pagesPath = Join-Path $basePath "pages"

Write-Host "Starting page file migration to Next.js App Router structure..."

# Function to safely move a file
function Move-PageFile {
    param (
        [string]$sourceFile,
        [string]$targetDir
    )
    
    if (Test-Path $sourceFile) {
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        
        $fileName = Split-Path $sourceFile -Leaf
        $targetFile = Join-Path $targetDir $fileName
        
        # Move the file
        Move-Item -Path $sourceFile -Destination $targetFile -Force
        Write-Host "Moved: $sourceFile -> $targetFile"
    } else {
        Write-Host "Source file not found: $sourceFile"
    }
}

# List of pages to move
$pages = @(
    "dashboard",
    "students",
    "items",
    "sales",
    "equipment",
    "login",
    "register"
)

# Move each page file
foreach ($page in $pages) {
    $sourceFile = Join-Path $pagesPath $page "page.tsx"
    $targetDir = Join-Path $basePath $page
    
    Move-PageFile -sourceFile $sourceFile -targetDir $targetDir
}

# Verify the moves
Write-Host "`nVerifying moves..."
foreach ($page in $pages) {
    $targetFile = Join-Path $basePath $page "page.tsx"
    if (Test-Path $targetFile) {
        Write-Host "✓ $page/page.tsx moved successfully"
    } else {
        Write-Host "✗ $page/page.tsx move failed"
    }
}

Write-Host "`nMigration complete!" 