// Simple integration test for the frontend
const fs = require('fs');
const path = require('path');

console.log('🔍 Running frontend integration tests...\n');

// Test 1: Check if all required files exist
console.log('1. Checking required files...');
const requiredFiles = [
    'index.html',
    'styles.css', 
    'main.ts',
    'types.ts',
    'utils.ts',
    'package.json',
    'tsconfig.json'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, file));
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allFilesExist = false;
});

// Test 2: Check if build directory exists and has required files
console.log('\n2. Checking build output...');
const distFiles = [
    'index.html',
    'styles.css',
    'main.js',
    'main.js.map',
    'utils.js',
    'types.js'
];

let allDistFilesExist = true;
distFiles.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, 'dist', file));
    console.log(`   ${exists ? '✅' : '❌'} dist/${file}`);
    if (!exists) allDistFilesExist = false;
});

// Test 3: Check HTML structure
console.log('\n3. Checking HTML structure...');
let allHtmlChecksPass = true;
try {
    const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const htmlChecks = [
        { test: htmlContent.includes('Just give me the fucking recipe'), name: 'Title present' },
        { test: htmlContent.includes('No ad. No communism. No bullshit. Just recipe.'), name: 'Tagline present' },
        { test: htmlContent.includes('id="search-input"'), name: 'Search input present' },
        { test: htmlContent.includes('id="results-container"'), name: 'Results container present' },
        { test: htmlContent.includes('class="results-grid"'), name: 'Results grid class present' },
        { test: htmlContent.includes('main.js'), name: 'JavaScript file referenced' },
        { test: htmlContent.includes('styles.css'), name: 'CSS file referenced' }
    ];
    
    htmlChecks.forEach(check => {
        console.log(`   ${check.test ? '✅' : '❌'} ${check.name}`);
        if (!check.test) allHtmlChecksPass = false;
    });
} catch (error) {
    console.log('   ❌ Error reading HTML file:', error.message);
    allHtmlChecksPass = false;
}

// Test 4: Check CSS structure
console.log('\n4. Checking CSS structure...');
let allCssChecksPass = true;
try {
    const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    const cssChecks = [
        { test: cssContent.includes(':root'), name: 'CSS variables defined' },
        { test: cssContent.includes('--bg-color'), name: 'Dark theme colors defined' },
        { test: cssContent.includes('.results-grid'), name: 'Results grid styles present' },
        { test: cssContent.includes('@media'), name: 'Responsive design present' },
        { test: cssContent.includes('.recipe-card'), name: 'Recipe card styles present' },
        { test: cssContent.includes('--bg-color') && cssContent.includes('#121212'), name: 'Dark theme present' }
    ];
    
    cssChecks.forEach(check => {
        console.log(`   ${check.test ? '✅' : '❌'} ${check.name}`);
        if (!check.test) allCssChecksPass = false;
    });
} catch (error) {
    console.log('   ❌ Error reading CSS file:', error.message);
    allCssChecksPass = false;
}

// Test 5: Check TypeScript compilation
console.log('\n5. Checking TypeScript compilation...');
let allTsChecksPass = true;
try {
    const mainJsContent = fs.readFileSync(path.join(__dirname, 'dist', 'main.js'), 'utf8');
    const tsChecks = [
        { test: mainJsContent.length > 1000, name: 'Main JS file has content' },
        { test: mainJsContent.includes('searchRecipes'), name: 'Search function present' },
        { test: mainJsContent.includes('debounce'), name: 'Debounce function present' },
        { test: mainJsContent.includes('createRecipeCard'), name: 'Recipe card function present' }
    ];
    
    tsChecks.forEach(check => {
        console.log(`   ${check.test ? '✅' : '❌'} ${check.name}`);
        if (!check.test) allTsChecksPass = false;
    });
} catch (error) {
    console.log('   ❌ Error reading compiled JS file:', error.message);
    allTsChecksPass = false;
}

// Summary
console.log('\n📊 Test Summary:');
const passedChecks = [allFilesExist, allDistFilesExist].filter(Boolean).length;
const totalChecks = 2;
console.log(`   Files: ${allFilesExist ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   Build: ${allDistFilesExist ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   HTML: ${allHtmlChecksPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   CSS: ${allCssChecksPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   TS Compilation: ${allTsChecksPass ? '✅ PASS' : '❌ FAIL'}`);

const overallPass = allFilesExist && allDistFilesExist && allHtmlChecksPass && allCssChecksPass && allTsChecksPass;
console.log(`\n🎯 Overall: ${overallPass ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

process.exit(overallPass ? 0 : 1);