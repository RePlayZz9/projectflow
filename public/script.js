// Task data
let tasks = [
    {
        id: '1',
        name: 'Design new landing page hero section',
        status: 'In progress',
        priority: 'High',
        assignee: { name: 'Sarah Chen', initials: 'SC' },
        dueDate: '2024-12-15',
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
        dueDate: '2024-12-18',
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
        dueDate: '2024-12-12',
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
        dueDate: '2024-12-20',
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
        dueDate: '2024-12-16',
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
        dueDate: '2024-12-22',
        project: 'Performance',
        comments: 1,
        attachments: 0
    }
];

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const newTaskBtn = document.querySelector('.new-task-btn');
const newTaskModal = document.getElementById('newTaskModal');
const modalClose = document.querySelector('.modal-close');
const cancelTaskBtn = document.getElementById('cancelTask');
const newTaskForm = document.getElementById('newTaskForm');
const taskTableBody = document.getElementById('taskTableBody');
const selectAllCheckbox = document.getElementById('selectAll');
const searchInput = document.querySelector('.search-input');
const navItems = document.querySelectorAll('.nav-item');
const viewBtns = document.querySelectorAll('.view-btn');
const workspaceItems = document.querySelectorAll('.workspace-item');
const addWorkspaceBtn = document.querySelector('.add-workspace-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Render tasks
    renderTasks();
    
    // Set up event listeners
    setupEventListeners();
});

// Theme management
function setTheme(theme) {
    document.body.className = theme + '-theme';
    const themeIcon = themeToggle;
    
    if (theme === 'dark') {
        themeIcon.setAttribute('data-lucide', 'moon');
    } else {
        themeIcon.setAttribute('data-lucide', 'sun');
    }
    
    // Recreate icons to update the theme toggle icon
    lucide.createIcons();
    
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Event listeners setup
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Modal controls
    newTaskBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    cancelTaskBtn.addEventListener('click', closeModal);
    newTaskModal.addEventListener('click', function(e) {
        if (e.target === newTaskModal) {
            closeModal();
        }
    });
    
    // Form submission
    newTaskForm.addEventListener('submit', handleNewTask);
    
    // Select all checkbox
    selectAllCheckbox.addEventListener('change', handleSelectAll);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const navType = this.getAttribute('data-nav');
            handleNavigation(navType);
        });
    });
    
    // View toggle buttons
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(view => view.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            handleViewChange(viewType);
        });
    });
    
    // Workspace items
    workspaceItems.forEach(item => {
        item.addEventListener('click', function() {
            workspaceItems.forEach(workspace => workspace.classList.remove('active'));
            this.classList.add('active');
            
            const workspaceName = this.querySelector('.workspace-name').textContent;
            handleWorkspaceChange(workspaceName);
        });
    });
    
    // Add workspace button
    addWorkspaceBtn.addEventListener('click', handleAddWorkspace);
}

// Modal functions
function openModal() {
    newTaskModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    newTaskModal.classList.remove('active');
    document.body.style.overflow = '';
    newTaskForm.reset();
}

// Task management
function handleNewTask(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskAssignee = document.getElementById('taskAssignee').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskProject = document.getElementById('taskProject').value;
    
    // Generate initials from assignee name
    const initials = taskAssignee.split(' ').map(name => name[0]).join('').toUpperCase();
    
    const newTask = {
        id: Date.now().toString(),
        name: taskName,
        status: taskStatus,
        priority: taskPriority,
        assignee: { name: taskAssignee, initials: initials },
        dueDate: taskDueDate,
        project: taskProject,
        comments: 0,
        attachments: 0
    };
    
    tasks.unshift(newTask);
    renderTasks();
    closeModal();
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }
}

function toggleTaskStatus(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const statusOrder = ['Pending', 'In progress', 'Complete'];
        const currentIndex = statusOrder.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        task.status = statusOrder[nextIndex];
        renderTasks();
    }
}

// Render functions
function renderTasks(tasksToRender = tasks) {
    taskTableBody.innerHTML = '';
    
    tasksToRender.forEach((task, index) => {
        const row = createTaskRow(task, index);
        taskTableBody.appendChild(row);
    });
    
    // Recreate icons for the new content
    lucide.createIcons();
}

function createTaskRow(task, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}">
        </td>
        <td>
            <div class="task-name">
                <span class="task-name-text">${task.name}</span>
                <div class="task-actions">
                    <button class="task-action-btn" onclick="editTask('${task.id}')">
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
            <span class="status-badge ${getStatusClass(task.status)}" onclick="toggleTaskStatus('${task.id}')" style="cursor: pointer;">
                ${task.status}
            </span>
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
                <span class="due-date-text">${formatDate(task.dueDate)}</span>
            </div>
        </td>
        <td>
            <span class="project-text">${task.project}</span>
        </td>
        <td>
            <div class="dropdown">
                <button class="more-actions-btn" onclick="showTaskMenu('${task.id}')">
                    <i data-lucide="more-horizontal"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Utility functions
function getStatusClass(status) {
    switch (status) {
        case 'In progress':
            return 'status-in-progress';
        case 'Complete':
            return 'status-complete';
        case 'Pending':
            return 'status-pending';
        case 'Blocked':
            return 'status-blocked';
        default:
            return '';
    }
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

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.name.toLowerCase().includes(searchTerm) ||
        task.project.toLowerCase().includes(searchTerm) ||
        task.assignee.name.toLowerCase().includes(searchTerm) ||
        task.status.toLowerCase().includes(searchTerm)
    );
    renderTasks(filteredTasks);
}

// Select all functionality
function handleSelectAll(e) {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
}

// Task actions
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        // Pre-fill the form with task data
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskStatus').value = task.status;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskAssignee').value = task.assignee.name;
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskProject').value = task.project;
        
        // Store the task ID for updating
        newTaskForm.dataset.editingTaskId = taskId;
        
        openModal();
    }
}

function showTaskMenu(taskId) {
    // Create a simple context menu
    const existingMenu = document.querySelector('.task-context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const menu = document.createElement('div');
    menu.className = 'task-context-menu';
    menu.style.cssText = `
        position: fixed;
        background: var(--bg-primary);
        border: 1px solid var(--border-primary);
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        min-width: 150px;
        padding: 8px 0;
    `;
    
    menu.innerHTML = `
        <button onclick="editTask('${taskId}')" style="width: 100%; text-align: left; padding: 8px 16px; border: none; background: none; color: var(--text-primary); cursor: pointer; font-size: 14px;">
            Edit Task
        </button>
        <button onclick="duplicateTask('${taskId}')" style="width: 100%; text-align: left; padding: 8px 16px; border: none; background: none; color: var(--text-primary); cursor: pointer; font-size: 14px;">
            Duplicate
        </button>
        <hr style="margin: 8px 0; border: none; border-top: 1px solid var(--border-primary);">
        <button onclick="deleteTask('${taskId}')" style="width: 100%; text-align: left; padding: 8px 16px; border: none; background: none; color: var(--error); cursor: pointer; font-size: 14px;">
            Delete Task
        </button>
    `;
    
    // Position the menu near the cursor
    const rect = event.target.getBoundingClientRect();
    menu.style.left = rect.left + 'px';
    menu.style.top = (rect.bottom + 5) + 'px';
    
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

function duplicateTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const duplicatedTask = {
            ...task,
            id: Date.now().toString(),
            name: task.name + ' (Copy)'
        };
        tasks.unshift(duplicatedTask);
        renderTasks();
    }
}

// Update the form submission handler to handle editing
const originalHandleNewTask = handleNewTask;
handleNewTask = function(e) {
    e.preventDefault();
    
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskAssignee = document.getElementById('taskAssignee').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskProject = document.getElementById('taskProject').value;
    
    const editingTaskId = newTaskForm.dataset.editingTaskId;
    
    if (editingTaskId) {
        // Update existing task
        const task = tasks.find(t => t.id === editingTaskId);
        if (task) {
            task.name = taskName;
            task.status = taskStatus;
            task.priority = taskPriority;
            task.assignee.name = taskAssignee;
            task.assignee.initials = taskAssignee.split(' ').map(name => name[0]).join('').toUpperCase();
            task.dueDate = taskDueDate;
            task.project = taskProject;
        }
        delete newTaskForm.dataset.editingTaskId;
    } else {
        // Create new task
        const initials = taskAssignee.split(' ').map(name => name[0]).join('').toUpperCase();
        
        const newTask = {
            id: Date.now().toString(),
            name: taskName,
            status: taskStatus,
            priority: taskPriority,
            assignee: { name: taskAssignee, initials: initials },
            dueDate: taskDueDate,
            project: taskProject,
            comments: 0,
            attachments: 0
        };
        
        tasks.unshift(newTask);
    }
    
    renderTasks();
    closeModal();
};

// Navigation handling
function handleNavigation(navType) {
    const taskSection = document.querySelector('.task-section');
    const taskHeader = document.querySelector('.task-header h1');
    const taskDescription = document.querySelector('.task-header p');
    const tableContainer = document.querySelector('.table-container');
    
    switch(navType) {
        case 'dashboard':
            taskHeader.textContent = 'Dashboard';
            taskDescription.textContent = 'Overview of your projects and recent activity';
            tableContainer.innerHTML = createDashboardContent();
            showNotification('Switched to Dashboard view', 'info');
            break;
        case 'tasks':
            taskHeader.textContent = 'Tasks';
            taskDescription.textContent = 'Manage your team\'s work and track progress';
            tableContainer.innerHTML = createTasksContent();
            renderTasks(); // Re-render tasks when switching back to tasks
            break;
        case 'goals':
            taskHeader.textContent = 'Goals';
            taskDescription.textContent = 'Set and track your project objectives';
            tableContainer.innerHTML = createGoalsContent();
            showNotification('Switched to Goals view', 'info');
            break;
        case 'docs':
            taskHeader.textContent = 'Documentation';
            taskDescription.textContent = 'Project documentation and knowledge base';
            tableContainer.innerHTML = createDocsContent();
            showNotification('Switched to Documentation view', 'info');
            break;
        case 'calendar':
            taskHeader.textContent = 'Calendar';
            taskDescription.textContent = 'View deadlines and schedule meetings';
            tableContainer.innerHTML = createCalendarContent();
            showNotification('Switched to Calendar view', 'info');
            break;
        case 'automations':
            taskHeader.textContent = 'Automations';
            taskDescription.textContent = 'Set up workflows and automated processes';
            tableContainer.innerHTML = createAutomationsContent();
            showNotification('Switched to Automations view', 'info');
            break;
        case 'settings':
            taskHeader.textContent = 'Settings';
            taskDescription.textContent = 'Configure your workspace preferences';
            tableContainer.innerHTML = createSettingsContent();
            showNotification('Switched to Settings view', 'info');
            break;
    }
    
    // Recreate icons for new content
    lucide.createIcons();
}

// View change handling
function handleViewChange(viewType) {
    switch(viewType) {
        case 'list':
            showNotification('Switched to List view', 'info');
            break;
        case 'grid':
            showNotification('Switched to Grid view', 'info');
            break;
        case 'calendar':
            showNotification('Switched to Calendar view', 'info');
            break;
    }
}

// Workspace handling
function handleWorkspaceChange(workspaceName) {
    const taskHeader = document.querySelector('.task-header h1');
    const taskDescription = document.querySelector('.task-header p');
    
    taskHeader.textContent = `${workspaceName} - Tasks`;
    taskDescription.textContent = `Managing tasks for ${workspaceName} workspace`;
    
    // Filter tasks based on workspace (you can implement actual filtering logic here)
    showNotification(`Switched to ${workspaceName} workspace`, 'success');
}

// Add workspace functionality
function handleAddWorkspace() {
    const workspaceName = prompt('Enter workspace name:');
    if (workspaceName && workspaceName.trim()) {
        const workspaceEmojis = ['🎯', '💼', '🚀', '📊', '🎨', '⚡', '🔧', '📝'];
        const randomEmoji = workspaceEmojis[Math.floor(Math.random() * workspaceEmojis.length)];
        
        const workspaceList = document.querySelector('.workspace-list');
        const newWorkspace = document.createElement('div');
        newWorkspace.className = 'workspace-item';
        newWorkspace.innerHTML = `
            <div class="workspace-info">
                <span class="workspace-emoji">${randomEmoji}</span>
                <span class="workspace-name">${workspaceName.trim()}</span>
            </div>
            <span class="workspace-count">0</span>
        `;
        
        // Add event listener to new workspace
        newWorkspace.addEventListener('click', function() {
            workspaceItems.forEach(workspace => workspace.classList.remove('active'));
            this.classList.add('active');
            
            const workspaceName = this.querySelector('.workspace-name').textContent;
            handleWorkspaceChange(workspaceName);
        });
        
        workspaceList.appendChild(newWorkspace);
        showNotification(`Created workspace: ${workspaceName}`, 'success');
    }
}
// Keyboard shortcuts
// Page content creators
function createDashboardContent() {
    return `
        <div class="dashboard-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; padding: 24px;">
            <div class="dashboard-card" style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <i data-lucide="check-square" style="width: 20px; height: 20px; color: var(--accent-primary);"></i>
                    <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary);">Tasks Overview</h3>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--accent-primary);">${tasks.length}</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Total Tasks</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--success);">${tasks.filter(t => t.status === 'Complete').length}</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Completed</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--purple);">${tasks.filter(t => t.status === 'In progress').length}</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">In Progress</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--warning);">${tasks.filter(t => t.status === 'Pending').length}</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Pending</div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card" style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <i data-lucide="trending-up" style="width: 20px; height: 20px; color: var(--success);"></i>
                    <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary);">Recent Activity</h3>
                </div>
                <div style="space-y: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border-secondary);">
                        <div style="width: 8px; height: 8px; background: var(--success); border-radius: 50%;"></div>
                        <span style="font-size: 14px; color: var(--text-primary);">Task completed: API documentation</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border-secondary);">
                        <div style="width: 8px; height: 8px; background: var(--purple); border-radius: 50%;"></div>
                        <span style="font-size: 14px; color: var(--text-primary);">Started: Landing page design</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0;">
                        <div style="width: 8px; height: 8px; background: var(--warning); border-radius: 50%;"></div>
                        <span style="font-size: 14px; color: var(--text-primary);">New task: User research</span>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card" style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <i data-lucide="users" style="width: 20px; height: 20px; color: var(--purple);"></i>
                    <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary);">Team Members</h3>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${[...new Set(tasks.map(t => t.assignee.name))].map(name => {
                        const initials = name.split(' ').map(n => n[0]).join('');
                        return `<div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--bg-secondary); border-radius: 8px;">
                            <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: 500;">${initials}</div>
                            <span style="font-size: 12px; color: var(--text-primary);">${name}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

function createTasksContent() {
    return `
        <table class="task-table">
            <thead>
                <tr>
                    <th class="checkbox-col">
                        <input type="checkbox" id="selectAll">
                    </th>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Assignee</th>
                    <th>Due Date</th>
                    <th>Project</th>
                    <th class="actions-col"></th>
                </tr>
            </thead>
            <tbody id="taskTableBody">
                <!-- Tasks will be populated by JavaScript -->
            </tbody>
        </table>
    `;
}

function createGoalsContent() {
    return `
        <div style="padding: 24px;">
            <div style="display: grid; gap: 24px;">
                <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                    <div style="display: flex; align-items: center; justify-content: between; margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary);">Quarterly Goals</h3>
                        <button style="padding: 8px 16px; background: var(--accent-primary); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">
                            <i data-lucide="plus" style="width: 16px; height: 16px; margin-right: 8px;"></i>
                            Add Goal
                        </button>
                    </div>
                    <div style="display: grid; gap: 16px;">
                        <div style="border: 1px solid var(--border-secondary); border-radius: 8px; padding: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <i data-lucide="target" style="width: 20px; height: 20px; color: var(--accent-primary);"></i>
                                <h4 style="font-size: 16px; font-weight: 500; color: var(--text-primary);">Launch New Product</h4>
                                <span style="margin-left: auto; padding: 4px 8px; background: var(--bg-secondary); border-radius: 4px; font-size: 12px; color: var(--text-secondary);">75% Complete</span>
                            </div>
                            <p style="color: var(--text-secondary); margin-bottom: 12px;">Complete the development and launch of our new product line by Q4.</p>
                            <div style="background: var(--bg-secondary); border-radius: 8px; height: 8px; overflow: hidden;">
                                <div style="background: var(--accent-primary); height: 100%; width: 75%; transition: width 0.3s ease;"></div>
                            </div>
                        </div>
                        <div style="border: 1px solid var(--border-secondary); border-radius: 8px; padding: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <i data-lucide="users" style="width: 20px; height: 20px; color: var(--success);"></i>
                                <h4 style="font-size: 16px; font-weight: 500; color: var(--text-primary);">Expand Team</h4>
                                <span style="margin-left: auto; padding: 4px 8px; background: var(--bg-secondary); border-radius: 4px; font-size: 12px; color: var(--text-secondary);">50% Complete</span>
                            </div>
                            <p style="color: var(--text-secondary); margin-bottom: 12px;">Hire 5 new team members across engineering and design.</p>
                            <div style="background: var(--bg-secondary); border-radius: 8px; height: 8px; overflow: hidden;">
                                <div style="background: var(--success); height: 100%; width: 50%; transition: width 0.3s ease;"></div>
                            </div>
                        </div>
                        <div style="border: 1px solid var(--border-secondary); border-radius: 8px; padding: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <i data-lucide="trending-up" style="width: 20px; height: 20px; color: var(--warning);"></i>
                                <h4 style="font-size: 16px; font-weight: 500; color: var(--text-primary);">Increase Revenue</h4>
                                <span style="margin-left: auto; padding: 4px 8px; background: var(--bg-secondary); border-radius: 4px; font-size: 12px; color: var(--text-secondary);">25% Complete</span>
                            </div>
                            <p style="color: var(--text-secondary); margin-bottom: 12px;">Achieve 40% revenue growth compared to last quarter.</p>
                            <div style="background: var(--bg-secondary); border-radius: 8px; height: 8px; overflow: hidden;">
                                <div style="background: var(--warning); height: 100%; width: 25%; transition: width 0.3s ease;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createDocsContent() {
    return `
        <div style="padding: 24px;">
            <div style="display: grid; grid-template-columns: 250px 1fr; gap: 24px; height: 600px;">
                <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 16px;">
                    <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">Documentation</h3>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="padding: 8px 12px; border-radius: 6px; cursor: pointer; transition: background 0.15s ease;" onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background='transparent'">
                            <i data-lucide="book-open" style="width: 16px; height: 16px; margin-right: 8px; color: var(--accent-primary);"></i>
                            <span style="font-size: 14px; color: var(--text-primary);">Getting Started</span>
                        </div>
                        <div style="padding: 8px 12px; border-radius: 6px; cursor: pointer; transition: background 0.15s ease;" onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background='transparent'">
                            <i data-lucide="code" style="width: 16px; height: 16px; margin-right: 8px; color: var(--success);"></i>
                            <span style="font-size: 14px; color: var(--text-primary);">API Reference</span>
                        </div>
                        <div style="padding: 8px 12px; border-radius: 6px; cursor: pointer; transition: background 0.15s ease;" onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background='transparent'">
                            <i data-lucide="layers" style="width: 16px; height: 16px; margin-right: 8px; color: var(--purple);"></i>
                            <span style="font-size: 14px; color: var(--text-primary);">Components</span>
                        </div>
                        <div style="padding: 8px 12px; border-radius: 6px; cursor: pointer; transition: background 0.15s ease;" onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background='transparent'">
                            <i data-lucide="help-circle" style="width: 16px; height: 16px; margin-right: 8px; color: var(--warning);"></i>
                            <span style="font-size: 14px; color: var(--text-primary);">FAQ</span>
                        </div>
                    </div>
                </div>
                <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px; overflow-y: auto;">
                    <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">Getting Started</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 24px;">Welcome to ProjectFlow! This guide will help you get started with managing your projects and tasks effectively.</p>
                    
                    <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px;">Quick Start</h3>
                    <ol style="color: var(--text-secondary); margin-bottom: 24px; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">Create your first workspace</li>
                        <li style="margin-bottom: 8px;">Add team members to your project</li>
                        <li style="margin-bottom: 8px;">Create and assign tasks</li>
                        <li style="margin-bottom: 8px;">Track progress and deadlines</li>
                    </ol>
                    
                    <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px;">Key Features</h3>
                    <ul style="color: var(--text-secondary); margin-bottom: 24px; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">Task management with priorities and due dates</li>
                        <li style="margin-bottom: 8px;">Team collaboration and assignment</li>
                        <li style="margin-bottom: 8px;">Multiple workspace organization</li>
                        <li style="margin-bottom: 8px;">Progress tracking and reporting</li>
                    </ul>
                    
                    <div style="background: var(--bg-secondary); border-radius: 8px; padding: 16px; margin-top: 24px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <i data-lucide="lightbulb" style="width: 16px; height: 16px; color: var(--warning);"></i>
                            <strong style="color: var(--text-primary);">Pro Tip</strong>
                        </div>
                        <p style="color: var(--text-secondary); font-size: 14px;">Use keyboard shortcuts to navigate faster: Ctrl+K to search, Ctrl+N to create new tasks.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createCalendarContent() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let calendarHTML = `
        <div style="padding: 24px;">
            <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; justify-content: between; margin-bottom: 24px;">
                    <h3 style="font-size: 20px; font-weight: 600; color: var(--text-primary);">${today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                    <div style="display: flex; gap: 8px;">
                        <button style="padding: 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 6px; cursor: pointer;">
                            <i data-lucide="chevron-left" style="width: 16px; height: 16px; color: var(--text-primary);"></i>
                        </button>
                        <button style="padding: 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 6px; cursor: pointer;">
                            <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--text-primary);"></i>
                        </button>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--border-secondary); border-radius: 8px; overflow: hidden;">
                    <div style="background: var(--bg-secondary); padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary);">Sun</div>
                    <div style="background: var(--bg-secondary); padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary);">Mon</div>
                    <div style="background: var(--bg-secondary); padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary);">Tue</div>
                    <div style="background: var(--bg-secondary); padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary);">Wed</div>
                    <div style="background: var(--bg-secondary); padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary);">Thu</div>
                    <div style="background: var(--bg-secondary); padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary);">Fri</div>
                    <div style="background: var(--bg-secondary); padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary);">Sat</div>
    `;
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div style="background: var(--bg-primary); padding: 12px; min-height: 80px;"></div>`;
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate();
        const hasTask = tasks.some(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.getDate() === day && taskDate.getMonth() === currentMonth;
        });
        
        calendarHTML += `
            <div style="background: var(--bg-primary); padding: 12px; min-height: 80px; position: relative; ${isToday ? 'border: 2px solid var(--accent-primary);' : ''}">
                <div style="font-weight: ${isToday ? '600' : '400'}; color: ${isToday ? 'var(--accent-primary)' : 'var(--text-primary)'}; margin-bottom: 4px;">${day}</div>
                ${hasTask ? '<div style="width: 6px; height: 6px; background: var(--accent-primary); border-radius: 50%; position: absolute; top: 8px; right: 8px;"></div>' : ''}
            </div>
        `;
    }
    
    calendarHTML += `
                </div>
            </div>
        </div>
    `;
    
    return calendarHTML;
}

function createAutomationsContent() {
    return `
        <div style="padding: 24px;">
            <div style="display: grid; gap: 24px;">
                <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                    <div style="display: flex; align-items: center; justify-content: between; margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary);">Workflow Automations</h3>
                        <button style="padding: 8px 16px; background: var(--accent-primary); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">
                            <i data-lucide="plus" style="width: 16px; height: 16px; margin-right: 8px;"></i>
                            Create Automation
                        </button>
                    </div>
                    <div style="display: grid; gap: 16px;">
                        <div style="border: 1px solid var(--border-secondary); border-radius: 8px; padding: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <i data-lucide="zap" style="width: 20px; height: 20px; color: var(--warning);"></i>
                                <h4 style="font-size: 16px; font-weight: 500; color: var(--text-primary);">Auto-assign High Priority Tasks</h4>
                                <span style="margin-left: auto; padding: 4px 8px; background: var(--success); color: white; border-radius: 4px; font-size: 12px;">Active</span>
                            </div>
                            <p style="color: var(--text-secondary); margin-bottom: 12px;">Automatically assign high priority tasks to available team members.</p>
                            <div style="display: flex; gap: 8px;">
                                <button style="padding: 4px 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 4px; font-size: 12px; cursor: pointer;">Edit</button>
                                <button style="padding: 4px 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 4px; font-size: 12px; cursor: pointer;">Disable</button>
                            </div>
                        </div>
                        <div style="border: 1px solid var(--border-secondary); border-radius: 8px; padding: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <i data-lucide="bell" style="width: 20px; height: 20px; color: var(--accent-primary);"></i>
                                <h4 style="font-size: 16px; font-weight: 500; color: var(--text-primary);">Due Date Reminders</h4>
                                <span style="margin-left: auto; padding: 4px 8px; background: var(--success); color: white; border-radius: 4px; font-size: 12px;">Active</span>
                            </div>
                            <p style="color: var(--text-secondary); margin-bottom: 12px;">Send notifications 24 hours before task due dates.</p>
                            <div style="display: flex; gap: 8px;">
                                <button style="padding: 4px 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 4px; font-size: 12px; cursor: pointer;">Edit</button>
                                <button style="padding: 4px 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 4px; font-size: 12px; cursor: pointer;">Disable</button>
                            </div>
                        </div>
                        <div style="border: 1px solid var(--border-secondary); border-radius: 8px; padding: 16px; opacity: 0.6;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <i data-lucide="archive" style="width: 20px; height: 20px; color: var(--text-tertiary);"></i>
                                <h4 style="font-size: 16px; font-weight: 500; color: var(--text-primary);">Auto-archive Completed Tasks</h4>
                                <span style="margin-left: auto; padding: 4px 8px; background: var(--text-tertiary); color: white; border-radius: 4px; font-size: 12px;">Inactive</span>
                            </div>
                            <p style="color: var(--text-secondary); margin-bottom: 12px;">Automatically archive tasks 7 days after completion.</p>
                            <div style="display: flex; gap: 8px;">
                                <button style="padding: 4px 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 4px; font-size: 12px; cursor: pointer;">Enable</button>
                                <button style="padding: 4px 8px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 4px; font-size: 12px; cursor: pointer;">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createSettingsContent() {
    return `
        <div style="padding: 24px;">
            <div style="display: grid; gap: 24px; max-width: 800px;">
                <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 20px;">General Settings</h3>
                    <div style="display: grid; gap: 20px;">
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px;">Workspace Name</label>
                            <input type="text" value="ProjectFlow Workspace" style="width: 100%; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 6px; color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px;">Time Zone</label>
                            <select style="width: 100%; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 6px; color: var(--text-primary);">
                                <option>UTC-8 (Pacific Time)</option>
                                <option>UTC-5 (Eastern Time)</option>
                                <option>UTC+0 (GMT)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px;">Language</label>
                            <select style="width: 100%; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-secondary); border-radius: 6px; color: var(--text-primary);">
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>German</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 20px;">Notifications</h3>
                    <div style="display: grid; gap: 16px;">
                        <div style="display: flex; align-items: center; justify-content: between;">
                            <div>
                                <div style="font-size: 14px; font-weight: 500; color: var(--text-primary);">Email Notifications</div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Receive email updates for task assignments</div>
                            </div>
                            <input type="checkbox" checked style="margin-left: auto;">
                        </div>
                        <div style="display: flex; align-items: center; justify-content: between;">
                            <div>
                                <div style="font-size: 14px; font-weight: 500; color: var(--text-primary);">Push Notifications</div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Browser notifications for urgent tasks</div>
                            </div>
                            <input type="checkbox" checked style="margin-left: auto;">
                        </div>
                        <div style="display: flex; align-items: center; justify-content: between;">
                            <div>
                                <div style="font-size: 14px; font-weight: 500; color: var(--text-primary);">Weekly Summary</div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Weekly progress reports via email</div>
                            </div>
                            <input type="checkbox" style="margin-left: auto;">
                        </div>
                    </div>
                </div>
                
                <div style="background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 20px;">Account</h3>
                    <div style="display: grid; gap: 16px;">
                        <button style="padding: 8px 16px; background: var(--accent-primary); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; justify-self: start;">
                            Change Password
                        </button>
                        <button style="padding: 8px 16px; background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-secondary); border-radius: 6px; font-size: 14px; cursor: pointer; justify-self: start;">
                            Export Data
                        </button>
                        <button style="padding: 8px 16px; background: var(--error); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; justify-self: start;">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('keydown', function(e) {
    // Escape key to close modal
    if (e.key === 'Escape' && newTaskModal.classList.contains('active')) {
        closeModal();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl/Cmd + N to create new task
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
});

// Add some sample notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        border: 1px solid var(--border-primary);
        border-radius: 8px;
        padding: 16px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" style="color: ${type === 'success' ? 'var(--success)' : 'var(--accent-primary)'}; width: 20px; height: 20px;"></i>
            <span style="color: var(--text-primary); font-size: 14px;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification when tasks are created/updated
const originalCloseModal = closeModal;
closeModal = function() {
    const wasEditing = newTaskForm.dataset.editingTaskId;
    originalCloseModal();
    
    if (document.getElementById('taskName').value) {
        showNotification(wasEditing ? 'Task updated successfully!' : 'Task created successfully!', 'success');
    }
};