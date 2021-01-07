#!/usr/bin/env pwsh

# Start-Pipeline
. $(Join-Path -Path $PSScriptRoot -ChildPath "common" "Start-Pipeline.ps1")

# Install-Dependencies
& $Paths.InstallDependencies

# Test
npm run build:test; if (-not $?) { throw }
npm run exec:test; if (-not $?) { throw }

# Stop-Pipeline
$Paths.StopPipeline