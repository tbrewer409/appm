$(document).ready(function() {
    $('#startForge').click(function() {
        $.get('/start_forge', alert);
    });
    $('#stopForge').click(function() {
        $.get('/stop_forge', alert);
    });
    $('#restartForge').click(function() {
        $.get('/restart_forge', alert);
    });

    $('#startComfy').click(function() {
        $.get('/start_comfyui', alert);
    });
    $('#stopComfy').click(function() {
        $.get('/stop_comfyui', alert);
    });
    $('#restartComfy').click(function() {
        $.get('/restart_comfyui', alert);
    });

    const forgeSource = new EventSource('/logs/forge');
    forgeSource.onmessage = function(event) {
        const log = $('#forgeLogs');
        log.append(event.data + '\n');
        log.scrollTop(log[0].scrollHeight);
    };

    const comfySource = new EventSource('/logs/comfyui');
    comfySource.onmessage = function(event) {
        const log = $('#comfyLogs');
        log.append(event.data + '\n');
        log.scrollTop(log[0].scrollHeight);
    };
});
