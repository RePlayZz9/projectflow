// Application state
let currentTheme = 'light';
let currentSection = 'tasks';
let currentDate = new Date();

// Sample data
const tasks = [
    {
        id: '1',
        name: 'Design new landing page hero section',
        status: 'In progress',
        priority: 'High',
        assignee: { name: 'Sarah Chen', initials: 'SC' },
        dueDate: 'Dec 15',
        project: 'Website Redesign',
        comments: 3,
        attachments: 2
    },
    {
        id: '2',
        name: 'Implement user authentication flow',
        status: 'Pending',
        priority: 'Medium',
        assignee: { name: 'Mike Johnson', initials: 'MJ' },
        dueDate: 'Dec 18',
        project: 'Auth System',
        comments: 1,
        attachments: 0
    },
    {
        id: '3',
        name: 'Write API documentation',
        status: 'Complete',
        priority: 'Low',
        assignee: { name: 'Alex Rodriguez', initials: 'AR' },
        dueDate: 'Dec 12',
        project: 'Documentation',
        comments: 5,
        attachments: 1
    },
    {
        id: '4',
        name: 'Set up CI/CD pipeline',
        status: 'Blocked',
        priority: 'High',
        assignee: { name: 'Emily Davis', initials: 'ED' },
        dueDate: 'Dec 20',
        project: 'DevOps',
        comments: 2,
        attachments: 3
    },
    {
        id: '5',
        name: 'Conduct user research interviews',
        status: 'In progress',
        priority: 'Medium',
        assignee: { name: 'John Smith', initials: 'JS' },
        dueDate: 'Dec 16',
        project: 'User Research',
        comments: 0,
        attachments: 0
    },
    {
        id: '6',
        name: 'Optimize database queries',
        status: 'Pending',
        priority: 'High',
        assignee: { name: 'Lisa Wang', initials: 'LW' },
        dueDate: 'Dec 22',
        project: 'Performance',
        comments: 1,
        attachments: 0
    }
];

const goals = [
    {
        id: 1,
        title: 'Launch Product V2.0',
        description: 'Complete development and launch the next version of our product',
        progress: 75,
        dueDate: 'Dec 31, 2024',
        priority: 'High',
        assignees: ['SC', 'MJ', 'AR'],
        status: 'On Track'
    },
    {
        id: 2,
        title: 'Increase User Engagement',
        description: 'Improve user engagement metrics by 25%',
        progress: 45,
        dueDate: 'Jan 15, 2025',
        priority: 'Medium',
        assignees: ['ED', 'JS'],
        status: 'At Risk'
    },
    {
        id: 3,
        title: 'Team Training Program',
        description: 'Complete training program for all team members',
        progress: 90,
        dueDate: 'Dec 20, 2024',
        priority: 'Low',
        assignees: ['LW', 'SC'],
        status: 'On Track'
    }
];

const documents = [
    {
        id: 1,
        title: 'Project Requirements',
        type: 'Requirements',
        lastModified: '2 hours ago',
        author: 'Sarah Chen',
        size: '2.4 MB',
        folder: 'Planning'
    },
    {
        id: 2,
        title: 'API Documentation',
        type: 'Technical',
        lastModified: '1 day ago',
        author: 'Mike Johnson',
        size: '1.8 MB',
        folder: 'Development'
    },
    {
        id: 3,
        title: 'User Research Findings',
        type: 'Research',
        lastModified: '3 days ago',
        author: 'Alex Rodriguez',
        size: '5.2 MB',
        folder: 'Research'
    },
    {
        id: 4,
        title: 'Design System Guide',
        type: 'Design',
        lastModified: '1 week ago',
        author: 'Emily Davis',
        size: '3.1 MB',
        folder: 'Design'
    },
    {
        id: 5,
        title: 'Meeting Notes - Sprint Planning',
        type: 'Notes',
        lastModified: '2 weeks ago',
        author: 'John Smith',
        size: '0.8 MB',
        folder: 'Meetings'
    }
];

const events = [
    {
        id: 1,
        title: 'Sprint Planning',
        time: '9:00 AM',
        duration: '2h',
        attendees: 8,
        type: 'meeting',
        date: new Date(2024, 11, 15)
    },
    {
        id: 2,
        title: 'Design Review',
        time: '2:00 PM',
        duration: '1h',
        attendees: 4,
        type: 'review',
        date: new Date(2024, 11, 15)
    },
    {
        id: 3,
        title: 'Product Demo',
        time: '10:00 AM',
        duration: '30m',
        attendees: 12,
        type: 'demo',
        date: new Date(2024, 11, 18)
    },
    {
        id: 4,
        title: 'Team Standup',
        time: '9:30 AM',
        duration: '15m',
        attendees: 6,
        type: 'standup',
        date: new Date(2024, 11, 20)
    }
];

const automations = [
    {
        id: 1,
        name: 'Auto-assign tasks to team members',
        description: 'Automatically assign new tasks based on workload and expertise',
        trigger: 'New task created',
        action: 'Assign to team member',
        status: 'Active',
        lastRun: '2 hours ago',
        runsToday: 12,
        enabled: true
    },
    {
        id: 2,
        name: 'Send deadline reminders',
        description: 'Send notifications 24 hours before task deadlines',
        trigger: 'Task due in 24 hours',
        action: 'Send notification',
        status: 'Active',
        lastRun: '6 hours ago',
        runsToday: 8,
        enabled: true
    },
    {
        id: 3,
        name: 'Update project status',
        description: 'Automatically update project status when all tasks are complete',
        trigger: 'All tasks completed',
        action: 'Update project status',
        status: 'Paused',
        lastRun: '2 days ago',
        runsToday: 0,
        enabled: false
    },
    {
        id: 4,
        name: 'Weekly progress reports',
        description: 'Generate and send weekly progress reports to stakeholders',
        trigger: 'Every Monday 9 AM',
        action: 'Generate report',
        status: 'Active',
        lastRun: '3 days ago',
        runsToday: 1,
        enabled: true
    },
    {
        id: 5,
        name: 'Slack integration sync',
        description: 'Sync task updates with Slack channels',
        trigger: 'Task status changed',
        action: 'Post to Slack',
        status: 'Active',
        lastRun: '1 hour ago',
        runsToday: 24,
        enabled: true
    }
];

// Utility functions
function getStatusColor(status) {
    const statusMap = {
        'In progress': 'status-in-progress',
        'Complete': 'status-complete',
        'Pending': 'status-pending',
        'Blocked': 'status-blocked'
    };
    return statusMap[status] || 'status-pending';
}

function getPriorityIcon(priority) {
    switch (priority) {
        case 'High':
            return '<i data-lucide="flag" class="priority-icon priority-high"></i>';
        case 'Medium':
            return '<i data-lucide="flame" class="priority-icon priority-medium"></i>';
        default:
            return '';
    }
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

// Theme management
function setTheme(theme) {
    currentTheme = theme;
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        body.className = 'dark-theme';
        themeToggle.innerHTML = '<i data-lucide="moon"></i>';
    } else {
        body.className = 'light-theme';
        themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    }
    
    // Update theme options in settings
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === theme) {
            option.classList.add('active');
        }
    });
    
    // Re-render lucide icons
    lucide.createIcons();
    
    localStorage.setItem('theme', theme);
}

// Navigation management
function setActiveSection(sectionId) {
    currentSection = sectionId;
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.nav === sectionId) {
            item.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${sectionId}-content`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    // Re-render content for specific sections
    switch(sectionId) {
        case 'goals':
            renderGoals();
            break;
        case 'docs':
            renderDocuments();
            break;
        case 'calendar':
            renderCalendar();
            break;
        case 'automations':
            renderAutomations();
            break;
    }
    
    // Re-initialize lucide icons
    lucide.createIcons();
}

// Task management
function renderTasks() {
    const tbody = document.getElementById('taskTableBody');
    tbody.innerHTML = tasks.map((task, index) => `
        <tr class="${index % 2 === 0 ? 'even' : 'odd'}">
            <td>
                <input type="checkbox" class="task-checkbox">
            </td>
            <td>
                <div class="task-name">
                    <span class="task-name-text">${task.name}</span>
                    <div class="task-actions">
                        <button class="task-action-btn">
                            <i data-lucide="edit-3"></i>
                        </button>
                        ${task.comments > 0 ? `
                            <div class="task-meta">
                                <i data-lucide="message-square"></i>
                                <span>${task.comments}</span>
                            </div>
                        ` : ''}
                        ${task.attachments > 0 ? `
                            <div class="task-meta">
                                <i data-lucide="paperclip"></i>
                                <span>${task.attachments}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </td>
            <td>
                <span class="status-badge ${getStatusColor(task.status)}">${task.status}</span>
            </td>
            <td>
                <div class="priority-container">
                    ${getPriorityIcon(task.priority)}
                    <span class="priority-text">${task.priority}</span>
                </div>
            </td>
            <td>
                <div class="assignee-container">
                    <div class="assignee-avatar">${task.assignee.initials}</div>
                    <span class="assignee-name">${task.assignee.name}</span>
                    <button class="task-action-btn assignee-add">
                        <i data-lucide="user-plus"></i>
                    </button>
                </div>
            </td>
            <td>
                <div class="due-date-container">
                    <i data-lucide="calendar"></i>
                    <span class="due-date-text">${task.dueDate}</span>
                </div>
            </td>
            <td>
                <span class="project-text">${task.project}</span>
            </td>
            <td>
                <button class="more-actions-btn">
                    <i data-lucide="more-horizontal"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    lucide.createIcons();
}

// Goals management
function renderGoals() {
    const container = document.getElementById('goalsGrid');
    container.innerHTML = goals.map(goal => `
        <div class="goal-card">
            <div class="goal-header">
                <div class="goal-icon">
                    <i data-lucide="target"></i>
                </div>
                <div class="goal-info">
                    <h3>${goal.title}</h3>
                    <p>${goal.description}</p>
                </div>
                <span class="status-badge ${getStatusColor(goal.status)}">${goal.status}</span>
            </div>
            <div class="goal-progress">
                <div class="progress-header">
                    <span>Progress</span>
                    <span>${goal.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${goal.progress}%"></div>
                </div>
            </div>
            <div class="goal-footer">
                <div class="goal-meta">
                    <div class="goal-meta-item">
                        <i data-lucide="calendar"></i>
                        <span>${goal.dueDate}</span>
                    </div>
                    <div class="goal-meta-item">
                        <i data-lucide="trending-up" class="priority-${goal.priority.toLowerCase()}"></i>
                        <span>${goal.priority}</span>
                    </div>
                </div>
                <div class="goal-assignees">
                    <i data-lucide="users"></i>
                    <div class="assignees-list">
                        ${goal.assignees.map(assignee => `
                            <div class="assignee-avatar small">${assignee}</div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Documents management
function renderDocuments() {
    const tbody = document.getElementById('documentsTableBody');
    tbody.innerHTML = documents.map((doc, index) => `
        <tr class="${index % 2 === 0 ? 'even' : 'odd'}">
            <td>
                <div class="document-name">
                    <i data-lucide="file-text"></i>
                    <span>${doc.title}</span>
                </div>
            </td>
            <td>${doc.type}</td>
            <td>${doc.folder}</td>
            <td>
                <div class="author-info">
                    <div class="assignee-avatar small">${getInitials(doc.author)}</div>
                    <span>${doc.author}</span>
                </div>
            </td>
            <td>
                <div class="modified-info">
                    <i data-lucide="clock"></i>
                    <span>${doc.lastModified}</span>
                </div>
            </td>
            <td>${doc.size}</td>
        </tr>
    `).join('');
    
    lucide.createIcons();
}

// Calendar management
function renderCalendar() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;
    
    let calendarHTML = '<div class="calendar-days-header">';
    daysOfWeek.forEach(day => {
        calendarHTML += `<div class="calendar-day-header">${day}</div>`;
    });
    calendarHTML += '</div><div class="calendar-days">';
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === new Date().toDateString();
        const dayEvents = events.filter(event => 
            event.date.toDateString() === date.toDateString()
        );
        
        calendarHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''}">
                <div class="day-number">${day}</div>
                <div class="day-events">
                    ${dayEvents.slice(0, 2).map(event => `
                        <div class="event-item ${event.type}">${event.title}</div>
                    `).join('')}
                    ${dayEvents.length > 2 ? `<div class="more-events">+${dayEvents.length - 2} more</div>` : ''}
                </div>
            </div>
        `;
    }
    
    calendarHTML += '</div>';
    document.getElementById('calendarGrid').innerHTML = calendarHTML;
    
    // Render upcoming events
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = events.slice(0, 4).map(event => `
        <div class="event-card">
            <div class="event-info">
                <div class="event-type ${event.type}">${event.type}</div>
                <div class="event-details">
                    <h4>${event.title}</h4>
                    <div class="event-meta">
                        <div class="event-meta-item">
                            <i data-lucide="clock"></i>
                            <span>${event.time} (${event.duration})</span>
                        </div>
                        <div class="event-meta-item">
                            <i data-lucide="users"></i>
                            <span>${event.attendees} attendees</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="event-date">${event.date.toLocaleDateString()}</div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Automations management
function renderAutomations() {
    const container = document.getElementById('automationsList');
    container.innerHTML = automations.map(automation => `
        <div class="automation-card">
            <div class="automation-header">
                <div class="automation-icon ${automation.enabled ? 'enabled' : 'disabled'}">
                    <i data-lucide="zap"></i>
                </div>
                <div class="automation-info">
                    <div class="automation-title">
                        <h3>${automation.name}</h3>
                        <span class="status-badge ${getStatusColor(automation.status)}">${automation.status}</span>
                    </div>
                    <p>${automation.description}</p>
                </div>
                <div class="automation-controls">
                    <button class="automation-toggle ${automation.enabled ? 'enabled' : 'disabled'}" data-id="${automation.id}">
                        <i data-lucide="${automation.enabled ? 'pause' : 'play'}"></i>
                    </button>
                    <button class="automation-settings">
                        <i data-lucide="settings"></i>
                    </button>
                </div>
            </div>
            <div class="automation-details">
                <div class="automation-triggers">
                    <div class="trigger-item">
                        <span class="trigger-label">Trigger</span>
                        <span class="trigger-value">${automation.trigger}</span>
                    </div>
                    <div class="trigger-item">
                        <span class="trigger-label">Action</span>
                        <span class="trigger-value">${automation.action}</span>
                    </div>
                </div>
                <div class="automation-stats">
                    <div class="stat-item">
                        <i data-lucide="clock"></i>
                        <span>Last run: ${automation.lastRun}</span>
                    </div>
                    <div class="stat-item">
                        <i data-lucide="check-circle"></i>
                        <span>${automation.runsToday} runs today</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Modal management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            setActiveSection(item.dataset.nav);
        });
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
    
    // Theme options in settings
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            setTheme(option.dataset.theme);
        });
    });
    
    // New task button
    document.querySelector('.new-task-btn').addEventListener('click', () => {
        openModal('newTaskModal');
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            closeModal(modal.id);
        });
    });
    
    // Modal overlay click to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
    
    // Cancel task button
    document.getElementById('cancelTask').addEventListener('click', () => {
        closeModal('newTaskModal');
    });
    
    // New task form
    document.getElementById('newTaskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newTask = {
            id: Date.now().toString(),
            name: document.getElementById('taskName').value,
            status: document.getElementById('taskStatus').value,
            priority: document.getElementById('taskPriority').value,
            assignee: {
                name: document.getElementById('taskAssignee').value,
                initials: getInitials(document.getElementById('taskAssignee').value)
            },
            dueDate: new Date(document.getElementById('taskDueDate').value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            project: document.getElementById('taskProject').value,
            comments: 0,
            attachments: 0
        };
        
        tasks.unshift(newTask);
        renderTasks();
        closeModal('newTaskModal');
        e.target.reset();
    });
    
    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // View toggle buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Select all checkbox
    document.getElementById('selectAll').addEventListener('change', (e) => {
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });
    
    // Initial render
    renderTasks();
    renderGoals();
    renderDocuments();
    renderCalendar();
    renderAutomations();
    
    // Set initial active section
    setActiveSection('tasks');
    
    // Initialize lucide icons
    lucide.createIcons();
});

// Automation toggle functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.automation-toggle')) {
        const button = e.target.closest('.automation-toggle');
        const automationId = parseInt(button.dataset.id);
        const automation = automations.find(a => a.id === automationId);
        
        if (automation) {
            automation.enabled = !automation.enabled;
            automation.status = automation.enabled ? 'Active' : 'Paused';
            renderAutomations();
        }
    }
});