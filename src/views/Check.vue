    <template>
        <ol>
            <li>
                <span><input type="checkbox" v-model="selectAll"></th></span>
                <span align="left">全选</span>
            </li>
            <li v-for="answer in answers">
                <span>
                    <input type="checkbox" v-model="selected" :value="answer.id" >
                </span>
                <span>{{ answer.name }}</span>
            </li>
            <li>{{selected}}</li>
        </ol>
    </template>
    <script>
export default {
            data() {
              return{
                answers: [ 
                    { "id": 1, "name": "A" },
                    { "id": 2, "name": "B" }, 
                    { "id": 3, "name": "C" }, 
                    { "id": 4, "name": "D" }
                ],
                selected: []
              }
            },
            computed: {
                selectAll: {
                    get: function () {
                        return this.answers ? this.selected.length == this.answers.length : false;
                    },
                    set: function (value) {
                        var selected = [];

                        if (value) {
                            this.answers.forEach(function (user) {
                                selected.push(user.id);
                            });
                        }

                        this.selected = selected;
                    }
                }
            }
        };
    </script>