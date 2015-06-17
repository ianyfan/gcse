node build.js

node uglifyjs notes.js -o gcse/notes.js -c -m --screw-ie8

sass themes/biology.scss:gcse/biology.css --style compressed --sourcemap=none
sass themes/chemistry.scss:gcse/chemistry.css --style compressed --sourcemap=none
sass themes/electronics.scss:gcse/electronics.css --style compressed --sourcemap=none
sass themes/geography.scss:gcse/geography.css --style compressed --sourcemap=none
sass themes/home.scss:gcse/home.css --style compressed --sourcemap=none
sass themes/physics.scss:gcse/physics.css --style compressed --sourcemap=none

sass notesjs.scss:gcse/notesjs.css --style compressed --sourcemap=none
