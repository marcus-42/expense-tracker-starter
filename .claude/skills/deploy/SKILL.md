Deploy the app to staging: run all tests, build the production bundle, then push to staging.

## Steps

1. **Run tests** — execute `npm test -- --run` and abort if any tests fail
2. **Build** — execute `npm run build` and abort if the build fails
3. **Push to staging** — execute `npm run deploy:staging` if the script exists, otherwise run `git push staging main` and report the result

After each step, report what happened. If any step fails, stop immediately and show the error output — do not proceed to the next step.
