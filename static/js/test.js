var obj = {
    foo: 'bar',
    seen: "false",
    iftest: "true",
    url: "https://www.baidu.com",
    raw: "<p style='color:red'>this should be red</p>"
}

vm1 = new Vue({
    el: "#app",
    data: obj
})

vm2 = new Vue({
    el: "#example",
    data: {
        message: "Hello",
        firstName: 'Foo',
        lastName: 'Bar',
    },
    computed: {
        // 计算属性的getter
        reversedMessage: function () {
            // `this` 指向 vm 实例
            return this.message.split('').reverse().join('')
        },
        fullName: {
            get: function () {
                return this.firstName + " " + this.lastName
            },
            // 计算属性的setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        },
    }
})

vm3 = new Vue({
    el: "#chapter3",
    data: {
        isActive: "true"
    }
})


Vue.component('todo-item', {
    template: '\
    <li>\
        {{ title }}\
        <button @click="$emit(\'remove\')">Remove</button>\
    </li>\
    ',
    props: ['title']
})

// todo-list-example对象
vm5 = new Vue({
    el: "#todo-list-example",
    data: {
        newTodoText: "",
        todos: [{
                id: 1,
                title: "DO the dishes"
            },
            {
                id: 2,
                title: " Take out the trash"
            },
            {
                id: 3,
                title: "Mow the lawn"
            }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ""
        }
    }
})

// 输出是偶数的number
vm6 = new Vue({
    el: "#ifAndFor",
    data: {
        numbers: [1, 2, 3, 4, 5, 6]
    },
    methods: {
        even: function (number) {
            return number % 2 == 0
        }
    }
})

// 乌蝇哥
vmGame = new Vue({
    el: "#hitGame",
    data: {
        health: 0
    },
    methods: {
        healthInecrease: function () {
            if (this.health + 20 <= 100) this.health += 20;
        },
        restart: function () {
            this.health = 0
        }
    }
})

// 前后交互
watchExample = new Vue({
    el: "#watch-example",
    data: {
        question: "",
        answer: "I can't give you an answer until you ask a question!"
    },
    watch: {
        // 如果`question`发生改变，这个函数就会运行
        question: function (newQuestion, oldQuestion) {
            this.answer = "Waiting for you to stop typing..."
            this.debouncedGetAnswer()
        }
    },
    created: function () {
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function () {
            if (this.question.indexOf('?') == -1) {
                this.answer = "Questions usually contain a question mark. ;-)"
                return
            }
            this.answer = "Thinking..."
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                    vm.answer = "Error! Could not reach the API. "
                })
        },
    }
})

// 定义vue对象
enterExample = new Vue({
    el: '#enterExample',
    data: {
        question: "",
        answer: "waiting for giving a question..."
    },
    methods: {
        // 完成post请求的函数
        submit: function () {
            var vm = this
            axios.post('/yesno', {
                    'question': this.question
                })
                .then(function (response) {
                    // 将response中的数据赋值给answer
                    vm.answer = response.data.data
                    console.log(response.data.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
})

//定义一个名为 button-counter 的新组件
bc = new Vue({
    el: "#components-demo"
})
Vue.component('button-counter', {
    data: () => {
        return {
            count: 0
        }
    },
    template: '<button @click="count ++">You clicked me {{ count }} times</button>'
})

//prop用法
/*
发现问题，只有把模板放入新建vue对象中才能渲染
...未知原因
*/
hp = new Vue({
    el: "#h3props",
    data: {
        posts: [{
                id: 1,
                title: 'My journey with Vue'
            },
            {
                id: 2,
                title: 'Blogging with Vue'
            },
            {
                id: 3,
                title: 'Why Vue is so fun'
            }
        ]
    }
})

//简易版的blog-post模板
Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})

//模块化后的blog-post模板
Vue.component('blog-post-pro', {
    props: ['post'],
    template: `
    <div class="blog-post">
        <h3>{{ post.title }} </h3>
        <div v-html="post.content"></div>
        <button v-on:click="$emit('enlarge-text')">
        Enlarge text
        </button>
    </div>
    `
})
hpS = new Vue({
    el: "#h3PropPro",
    data: {
        postFontSize: 1,
        posts: [{
                id: 1,
                title: 'My journey with Vue',
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, asperiores!"
            },
            {
                id: 2,
                title: 'Blogging with Vue',
                content: "Accusamus voluptatum quaerat placeat deleniti eos iure nostrum quo illum."
            },
            {
                id: 3,
                title: 'Why Vue is so fun',
                content: "Repudiandae non dignissimos neque consequatur sint! Laboriosam, veritatis! Fugit, eligendi?"
            }
        ]
    }
})