#!/usr/bin/env pwsh
# To be run from a repository root

# Upgrade npm if less than v7 for peer depenencies
if ([System.Version]::Parse((npm --version)) -lt [System.Version]::Parse("7.0.0")) {
	# Just in case quote "@" mark argument
	npm install "npm@7"; if (-not $?) { throw }
}

# Install
npm install; if (-not $?) { throw }