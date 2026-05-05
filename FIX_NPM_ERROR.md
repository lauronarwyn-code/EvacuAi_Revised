# Fix NPM Installation Error

## Problem

You got this error:
```
npm error ERESOLVE unable to resolve dependency tree
npm error peer react@"^16.6.0 || ^17.0.0 || ^18.0.0" from react-helmet-async@2.0.5
```

This means `react-helmet-async` version 2.0.5 doesn't support React 19.

---

## Solution (Quick Fix)

### Option 1: Use --legacy-peer-deps (Easiest)

Delete `node_modules` and `package-lock.json`, then run:

```bash
npm install --legacy-peer-deps
npm run dev
```

This tells npm to ignore the version mismatch and install anyway.

---

### Option 2: Update package.json (Better Long-term)

I've already fixed the `package.json` in the cloud. You need to do this locally:

1. Open `package.json` in your project
2. Find this line (around line 58):
   ```json
   "react-helmet-async": "^2.0.5",
   ```

3. Change it to:
   ```json
   "react-helmet-async": "^3.0.0",
   ```

4. Delete `node_modules` folder (if it exists)
5. Delete `package-lock.json` (if it exists)
6. Run:
   ```bash
   npm install
   npm run dev
   ```

---

## Step-by-Step (Windows)

```bash
# Navigate to your project
cd C:\Users\liber\Arwyn Files\EvacuAi Draft\EvacuAiProject

# Delete old installations
rmdir /s /q node_modules
del package-lock.json

# Edit package.json - change line 58 from:
# "react-helmet-async": "^2.0.5",
# to:
# "react-helmet-async": "^3.0.0",

# Install fresh
npm install

# Start server
npm run dev
```

---

## Step-by-Step (Mac/Linux)

```bash
# Navigate to your project
cd ~/path/to/EvacuAiProject

# Delete old installations
rm -rf node_modules
rm package-lock.json

# Edit package.json - change line 58 from:
# "react-helmet-async": "^2.0.5",
# to:
# "react-helmet-async": "^3.0.0",

# Install fresh
npm install

# Start server
npm run dev
```

---

## If Still Getting Errors

Try the nuclear option - use --legacy-peer-deps:

```bash
npm install --legacy-peer-deps
npm run dev
```

This bypasses version checks completely (safe for development).

---

## What Changed

I updated `react-helmet-async` from version 2.0.5 to 3.0.0, which fully supports React 19.

This is a simple version bump - no code changes needed!

---

## Verification

After installation, check it worked:

```bash
npm list react-helmet-async
```

Should show: `react-helmet-async@3.0.0`

---

Done! Now run `npm run dev` and you're good to go.
