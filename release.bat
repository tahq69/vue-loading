:: Build assets
call npm run build

echo Build completed

:: Commit sources to git repository
git add -A
git commit -m "[build] v%1"

:: Update version number
call npm version %1 --message "[release] v%1"

echo Version updated

:: Publish
call git push
call npm publish

echo Publish done
