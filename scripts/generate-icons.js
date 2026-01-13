/**
 * Icon Generator Script
 * Genereert PWA icons uit SVG met Playwright
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'icons');

async function generateIcons() {
    console.log('Starting icon generation...');

    // Ensure icons directory exists
    if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Create HTML with canvas drawing
    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body>
        <canvas id="canvas"></canvas>
        <script>
            function drawIcon(size) {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const scale = size / 512;

                canvas.width = size;
                canvas.height = size;

                // Background
                const bgGrad = ctx.createLinearGradient(0, 0, size, size);
                bgGrad.addColorStop(0, '#2d5a27');
                bgGrad.addColorStop(1, '#4a8c42');

                ctx.beginPath();
                ctx.arc(size/2, size/2, size/2 - 1, 0, Math.PI * 2);
                ctx.fillStyle = bgGrad;
                ctx.fill();

                ctx.save();
                ctx.scale(scale, scale);

                // Glass body
                const glassGrad = ctx.createLinearGradient(160, 0, 352, 0);
                glassGrad.addColorStop(0, 'rgba(255,255,255,0.95)');
                glassGrad.addColorStop(1, 'rgba(232,245,233,0.95)');

                ctx.beginPath();
                ctx.moveTo(160, 140);
                ctx.lineTo(180, 420);
                ctx.quadraticCurveTo(182, 448, 215, 448);
                ctx.lineTo(297, 448);
                ctx.quadraticCurveTo(330, 448, 332, 420);
                ctx.lineTo(352, 140);
                ctx.closePath();
                ctx.fillStyle = glassGrad;
                ctx.fill();
                ctx.strokeStyle = '#2d5a27';
                ctx.lineWidth = 8;
                ctx.stroke();

                // Shake liquid
                const shakeGrad = ctx.createLinearGradient(0, 200, 0, 420);
                shakeGrad.addColorStop(0, '#ffd54f');
                shakeGrad.addColorStop(0.5, '#ffb300');
                shakeGrad.addColorStop(1, '#ff8f00');

                ctx.beginPath();
                ctx.moveTo(175, 200);
                ctx.lineTo(190, 400);
                ctx.quadraticCurveTo(191, 418, 215, 418);
                ctx.lineTo(297, 418);
                ctx.quadraticCurveTo(321, 418, 322, 400);
                ctx.lineTo(337, 200);
                ctx.closePath();
                ctx.fillStyle = shakeGrad;
                ctx.fill();

                // Foam
                ctx.beginPath();
                ctx.ellipse(256, 195, 82, 25, 0, 0, Math.PI * 2);
                ctx.fillStyle = '#fff8e1';
                ctx.fill();

                ctx.beginPath();
                ctx.ellipse(256, 190, 75, 20, 0, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();

                // Straw
                ctx.fillStyle = '#e53935';
                ctx.beginPath();
                ctx.roundRect(280, 100, 20, 200, 10);
                ctx.fill();

                // Decorative fruits
                ctx.globalAlpha = 0.8;
                ctx.beginPath();
                ctx.arc(220, 280, 25, 0, Math.PI * 2);
                ctx.fillStyle = '#ff7043';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(290, 320, 20, 0, Math.PI * 2);
                ctx.fillStyle = '#66bb6a';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(250, 360, 18, 0, Math.PI * 2);
                ctx.fillStyle = '#ab47bc';
                ctx.fill();

                // Bubbles
                ctx.globalAlpha = 0.6;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(200, 350, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(310, 380, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(230, 400, 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                return canvas.toDataURL('image/png').split(',')[1];
            }

            window.drawIcon = drawIcon;
        </script>
    </body>
    </html>
    `;

    await page.setContent(html);

    for (const size of sizes) {
        console.log(`Generating ${size}x${size} icon...`);

        const base64 = await page.evaluate((s) => window.drawIcon(s), size);
        const buffer = Buffer.from(base64, 'base64');
        const filename = path.join(iconsDir, `icon-${size}.png`);

        fs.writeFileSync(filename, buffer);
        console.log(`  Created: icon-${size}.png`);
    }

    await browser.close();
    console.log('\\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
