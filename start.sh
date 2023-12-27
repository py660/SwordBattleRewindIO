set -euo pipefail

# Download/update the SwordBattle clone
# --------
echo ":> Downloading/updating SwordBattle.io's source code..."
git clone https://github.com/py660/swordbattle.io.git swordbattle.io || echo ":> SwordBattle.io has already been downloaded." # Download repo if it doesn't exist
cd swordbattle.io # Get into repo
git reset --hard || { echo ":> Invalid 'repo'? No problem."; cd ..; rm -rf swordbattle.io; echo ":> Re-run this program."; exit 1; } # Reset repo to remove uncommitted changes
git pull || { echo ":> Divergent branches? No problem."; cd ..; rm -rf swordbattle.io; echo ":> Re-run this program."; exit 1; } # Update repo and reset to latest version
cd .. # Clean up

# Output list of revisions to text file
# --------
cd swordbattle.io # Get into repo
git log --oneline --all --pretty=format:'%C(auto)%h|%ci|%ce|%s' > ../revs.txt # Log all commit hashes, dates, and messages
cd .. # Clean up

# Start the webserver for choosing which version
# --------
npm install # Install dependencies
node index.js # Spin up pre-client webserver


# Rollback SwordBattle to a previous version
# --------
node waiting.js & sleep 3 # After selecting version, play some "elevator music" and make the client wait for enough time to read the text
echo ":> Resetting database..."
#node resetdb.js
#psql $DATABASE_URL -c "$(cat psql.command)" || echo "Database was nonexistent, continuing..."
#psql $DATABASE_URL -c "$(cat psql.command.1)"
cd swordbattle.io
echo ":> Reverting changes to specified commit..."
git reset --hard $(cat ../wanted.txt)
echo ":> Installing dependencies..."
#sed -i -e "s/6LeIewsgAAAAAPp9VS21fBk7VWQX3wps40gWrUWH/${CAPTCHASITE}/g" config.json || echo "No config.json :("
#sed -i -e "s/6LdVxgYdAAAAAPtvjrXLAzSd2ANyzIkiSqk_yFpt/${CAPTCHASITE}/g" src/GameScene.js || echo "No src/GameScene.js :("
#sed -i -e "s/6LdVxgYdAAAAAPtvjrXLAzSd2ANyzIkiSqk_yFpt/${CAPTCHASITE}/g" src/index.html || echo "No src/index.html :("
#sed -i -e "s/6LdVxgYdAAAAAPtvjrXLAzSd2ANyzIkiSqk_yFpt/${CAPTCHASITE}/g" dist/index.html || echo "No dist/index.html :("
#sed -i -e "s/6LdVxgYdAAAAAPtvjrXLAzSd2ANyzIkiSqk_yFpt/${CAPTCHASITE}/g" dist/main.js.map || echo "dist/main.js.map :("
sed -i -e 's/"potato-detection": "^1.0.2",//g' package.json
npm install 2> ../sideput.log || echo ":> Cannot install dependencies, see sideput.log for more info."
node setup 2>> ../sideput.log || echo ":> Legacy version detected, skipping setup command..."
echo ":> Starting server..."
npm run build 2>> ../sideput.log || echo ":> Not executing 'npm run build' because it's not needed..."
# npm start
node index.js &> ../output.log || { echo ":> fatal: swordbattle.io has failed!"; echo ":> Spinning up recovery server..."; node ../recovery.js; }
cd ..
#echo ":> Installing dependencies..."
# DO AFTER ROLLBACK-ING: npm install # Install dependencies
echo ":> Done!" # Congratulatory message for sticking around for so long
# THE CAKE IS A LIE
