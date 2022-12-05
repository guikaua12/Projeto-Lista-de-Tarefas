let Main = {
    init: function() {
        this.cacheSelectors();
        this.bindEvents();
    },

    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check');
        this.$removeButtons = document.querySelectorAll('.remove');
        this.$inputTask = document.querySelector("#inputTask");
        this.$list = document.querySelector('#list');
    },

    bindEvents: function() {
        const self = this;

        this.$checkButtons.forEach(button => {
            button.onclick = self.Events.checkButton_click;
        });

        this.$removeButtons.forEach(button => {
            button.onclick = self.Events.removeButton_click.bind(self);
        })

        this.$inputTask.onkeydown = self.Events.inputTask_keydown.bind(this);
    },

    Events: {
        checkButton_click: function(e) {
            const parent = e.target.parentElement;
            const isDone = parent.classList.contains('done');

            if(!isDone) {
                parent.classList.add('done');
                return;
            }

            parent.classList.remove('done');
        },

        removeButton_click: function(e) {
            const parent = e.target.parentElement;
            parent.classList.add('removed');
        },

        inputTask_keydown: function(e) {
            if(e.key !== 'Enter') return;
            const task = e.target.value;
            if(task.trim() === '') return;

            this.$list.innerHTML += `
            <li>
                <div class="check"></div>
                <label class="task">${task}</label>
                <button class="remove">x</button>
            </li>
            `
            e.target.value = '';

            this.cacheSelectors();
            this.bindEvents();
        }
    }


}

Main.init();