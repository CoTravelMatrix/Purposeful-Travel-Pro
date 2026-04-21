// Panel switching functionality
function showPanel(id, el) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('panel-' + id).classList.add('active');
    el.classList.add('active');
}

// Message functionality
async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message) {
        try {
            const response = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    recipient: 'travel-pro-group', // Placeholder recipient
                }),
            });

            if (response.ok) {
                const result = await response.json();
                // Add message to UI
                const msgThread = document.getElementById('msg-thread');
                const newMsg = document.createElement('div');
                newMsg.className = 'msg-row sent';
                newMsg.innerHTML = `
                    <div class="msg-avatar">PM</div>
                    <div class="bubble-wrap">
                        <div class="bubble sent">${message}</div>
                        <div class="bubble-meta">Paula M · ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} · verified key holder</div>
                    </div>
                `;
                msgThread.appendChild(newMsg);
                input.value = '';
                msgThread.scrollTop = msgThread.scrollHeight;
            } else {
                alert('Failed to send message securely');
            }
        } catch (error) {
            alert('Error sending message: ' + error.message);
        }
    }
}

// Allow sending message on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('message-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Review filtering functionality
function filterReviews(category) {
    const tags = document.querySelectorAll('.filter-tag');
    tags.forEach(tag => tag.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('.review-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Purposeful Travel Pro MVP loaded');
});
