let todos = []
/**
 * @openapi
 * /todos:
 *   get:
 *     summary: Выводит все элементы списка дел!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
exports.getAll = (req, res) => {
    res.send(todos)
    console.log(todos);
}
/**
 * @openapi
 * /todos:
 *    post:
 *      summary: Создает элемент в списке дел
 *      consumes: application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              completed:
 *                 type: boolean
 *      responses:
 *        201:
 *          description: Created
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 */
exports.create = (req, res) => {
    const todo = req.body
    todo.id=0
    if(todos.length>0){
        const ids = todos.map(object => {
            return object.id;
        });
        todo.id = Math.max(...ids)+1

        console.log("Min;Max ids :",Math.min(...ids),";", todo.id)
    }
    //todo.id = todos.length
    todos.push(todo)
    res.send(todo)


}
/**
 * @swagger
 * /todos/{todo_id}:
 *  get:
 *    summary: Получить задачу из списка с введеным ID
 *    parameters:
 *    - in: path
 *      name: todo_id
 *      schema:
 *        type: string
 *      required: true
 *    description: Use to return your name with a message
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Not found
 */
exports.getById = (req, res) => {
    const id = parseInt(req.params.id)
    let todo = todos.find((t) => t.id === id)
    console.log(id);
    console.log(todo);
    if (!todo) {
        res.status(404).send()
    } else {
        res.send(todo)
    }
    console.log(todos);
}
/**
 * @openapi
 * /todos/{todo_id}:
 *    put:
 *      summary: Изменяет задачу с введеным ID
 *      consumes: application/json
 *      parameters:
 *        - in: path
 *          name: todo_id
 *          schema:
 *            type: string
 *            required: true
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              completed:
 *                 type: boolean
 *      responses:
 *        201:
 *          description: Created
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 */
exports.update = (req, res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find((t) => t.id === id)
    if (!todo) {
        res.status(404).send()
    } else {
        if(!req.body.hasOwnProperty("title")){
            req.body.title =  todos.find(u => u.id === id).title;
        }
        if(!req.body.hasOwnProperty("completed")){
            req.body.completed =  todos.find(u => u.id === id).completed
        }
        req.body.id=id
        const newTodo = req.body
        todos = todos.map((t) => (t.id === id ? newTodo : t))
        res.send(newTodo)
    }
    console.log(todos);
}
/**
 * @swagger
 * /todos/{todo_id}:
 *  delete:
 *    summary: удалить задачу с введеным ID
 *    parameters:
 *    - in: path
 *      name: todo_id
 *      schema:
 *        type: string
 *      required: true
 *    description: Use to return your name with a message
 *    responses:
 *      '200':
 *        description: A successful response
 *      '204':
 *        description: Запрос обработан успешно, но возвращать данные не требуется.
 *      '404':
 *        description: Not found
 */
exports.delete = (req, res) => {
    const id = parseInt(req.params.id)
    todos = todos.filter((t) => t.id !== id)
    res.status(204).send()
    console.log(todos);
}