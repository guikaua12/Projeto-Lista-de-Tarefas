let tasks = {
    'porra': {
        done: false,
        task: 'porraa'
    },
    'porra2': {
        done: false,
        task: 'porraa2'
    }
}

const Main = {
    init: function() {
        this.cacheSelectors();
        this.bindEvents();
        this.loadTasks();
    },

    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check');
        this.$removeButtons = document.querySelectorAll('.remove');
        this.$inputTask = document.querySelector("#inputTask");
        this.$list = document.querySelector('#list');
    },

    addOrUpdateTask: function(task) {
        this.tasks[task.id] = task;
        this.saveTasks();
    },

    removeTask: function(id) {
        delete this.tasks[id];
        this.saveTasks();
    },

    loadTasks: function() {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        this.tasks = !tasks && {} || tasks;

        for (let taskKey in this.tasks) {
            const currentTask = this.tasks[taskKey];
            this.$list.innerHTML += `
            <li id="${currentTask.id}" class="${currentTask.done && 'done'}">
                <div class="check"></div>
                <label class="task">${this.tasks[taskKey].task}</label>
                <button class="remove">x</button>
            </li>
            `;
        }
        this.cacheSelectors();
        this.bindEvents();
    },

    saveTasks: function() {
        tasks = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasks);
    },

    bindEvents: function() {
        const self = this;

        this.$checkButtons.forEach(button => {
            button.onclick = self.Events.checkButton_click.bind(this);
        });

        this.$removeButtons.forEach(button => {
            button.onclick = self.Events.removeButton_click.bind(self);
        })

        this.$inputTask.onkeydown = self.Events.inputTask_keydown.bind(this);
    },

    randomId: function() {
        let id = '';
        const chars = 'abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSUVWXYZ1234567890';
        for (let i = 0; i < chars.length; i++) {
            const random = Math.round(Math.random() * i);
            id += chars[random];
        }
        return id;
    },

    Events: {
        checkButton_click: function(e) {
            const parent = e.target.parentElement;
            const isDone = parent.classList.contains('done');
            let currentTask = this.tasks[parent.id];

            console.log(currentTask)
            if(!isDone) {
                parent.classList.add('done');
                currentTask.done = true;
                this.addOrUpdateTask(currentTask);
                return;
            }

            parent.classList.remove('done');
            currentTask.done = false;
            this.addOrUpdateTask(currentTask);
        },

        removeButton_click: function(e) {
            const parent = e.target.parentElement;
            this.removeTask(parent.id);
            parent.remove();
        },

        inputTask_keydown: function(e) {
            if(e.key !== 'Enter') return;
            const task = e.target.value;
            if(task.trim() === '') return;

            const taskObj = {
                id: this.randomId(),
                done: false,
                task: task
            };

            this.addOrUpdateTask(taskObj);

            this.$list.innerHTML += `
            <li id="${taskObj.id}">
                <div class="check"></div>
                <label class="task">${task}</label>
                <button class="remove">x</button>
            </li>
            `;

            e.target.value = '';

            this.cacheSelectors();
            this.bindEvents();
        }
    }


}

Main.init();