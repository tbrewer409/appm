const express = require('express');
const { exec, spawn } = require('child_process');
const path = require('path');
const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));

function startScript(scriptPath) {
    exec(`bash ${scriptPath} &`, (error) => {
        if (error) {
            console.error(`Error running ${scriptPath}: ${error}`);
        }
    });
}

// Forge routes
app.get('/start_forge', (req, res) => {
    startScript(path.join(__dirname, 'scripts/start_forge.sh'));
    res.send('Started Forge successfully!');
});

app.get('/stop_forge', (req, res) => {
    exec('fuser -k 3000/tcp', (error) => {
        if (error) console.error(`Error stopping Forge: ${error}`);
    });
    res.send('Stopped Forge successfully!');
});

app.get('/restart_forge', (req, res) => {
    exec('fuser -k 3000/tcp', (error) => {
        if (error) console.error(`Error stopping Forge: ${error}`);
        startScript(path.join(__dirname, 'scripts/start_forge.sh'));
    });
    res.send('Restarted Forge successfully!');
});

// ComfyUI routes
app.get('/start_comfyui', (req, res) => {
    startScript(path.join(__dirname, 'scripts/start_comfyui.sh'));
    res.send('Started ComfyUI successfully!');
});

app.get('/stop_comfyui', (req, res) => {
    exec('fuser -k 7860/tcp', (error) => {
        if (error) console.error(`Error stopping ComfyUI: ${error}`);
    });
    res.send('Stopped ComfyUI successfully!');
});

app.get('/restart_comfyui', (req, res) => {
    exec('fuser -k 7860/tcp', (error) => {
        if (error) console.error(`Error stopping ComfyUI: ${error}`);
        startScript(path.join(__dirname, 'scripts/start_comfyui.sh'));
    });
    res.send('Restarted ComfyUI successfully!');
});

function streamLog(req, res, logPath) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });
    const tail = spawn('tail', ['-n', '20', '-F', logPath]);
    tail.stdout.on('data', data => {
        res.write(`data: ${data}\n\n`);
    });
    tail.stderr.on('data', data => {
        res.write(`data: ${data}\n\n`);
    });
    req.on('close', () => tail.kill());
}

app.get('/logs/forge', (req, res) => {
    streamLog(req, res, '/workspace/logs/forge.log');
});

app.get('/logs/comfyui', (req, res) => {
    streamLog(req, res, '/workspace/logs/comfyui.log');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
