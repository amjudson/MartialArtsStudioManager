# Move folders from app to src
$srcPath = "src"
$appPath = "src/app"

# Create directories if they don't exist
$directories = @("components", "services", "utils", "types", "store", "config")
foreach ($dir in $directories) {
    if (-not (Test-Path "$srcPath/$dir")) {
        New-Item -ItemType Directory -Path "$srcPath/$dir" -Force
    }
}

# Move folders
Move-Item -Path "$appPath/components/*" -Destination "$srcPath/components/" -Force
Move-Item -Path "$appPath/services/*" -Destination "$srcPath/services/" -Force
Move-Item -Path "$appPath/utils/*" -Destination "$srcPath/utils/" -Force
Move-Item -Path "$appPath/types/*" -Destination "$srcPath/types/" -Force
Move-Item -Path "$appPath/store/*" -Destination "$srcPath/store/" -Force
Move-Item -Path "$appPath/config/*" -Destination "$srcPath/config/" -Force

# Remove empty directories
foreach ($dir in $directories) {
    if ((Get-ChildItem "$appPath/$dir" -ErrorAction SilentlyContinue) -eq $null) {
        Remove-Item "$appPath/$dir" -Force
    }
} 