# predeploy.sh

# remove the version hash from our base javascript file for a stable URL
find build/static/js -name "main.*.js" -exec mv '{}' build/static/js/main.js \;
find build/static/js -name "main.*.js.map" -exec mv '{}' build/static/js/main.js.map \;
find build/static/js -name "main.*.js.LICENSE.txt" -exec mv '{}' build/static/js/main.js.LICENSE.txt \;

find build/static/css -name "main.*.css" -exec mv '{}' build/static/css/main.css \;
find build/static/css -name "main.*.css.map" -exec mv '{}' build/static/css/main.css.map \;