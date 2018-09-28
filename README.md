## How to run

Execute `npm run dev` in the root directory.

## If you run once, you would need to kill ports manually to re-run

Find the PID using ports `3000` and `40000`:
`sudo lsof -i tcp:$port`
then

`kill -9 $PID`
