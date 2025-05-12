# Move files from app to src
$srcPath = "src"
$appPath = "src/app"

# Files to move
$filesToMove = @(
    "providers.tsx",
    "middleware.ts",
    "layout.tsx",
    "globals.css",
    "favicon.ico"
)

# Move each file
foreach ($file in $filesToMove) {
    if (Test-Path "$appPath/$file") {
        Move-Item -Path "$appPath/$file" -Destination "$srcPath/" -Force
    }
} 