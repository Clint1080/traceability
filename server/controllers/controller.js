const students = []

module.exports = {
        addStudent: (req, res) => {
    let { name } = req.body;
    name = name.trim();

    const index = students.findIndex((studentName) => studentName === name);

    if (index === -1 && name !== "") {
        students.push(name);
        rollbar.log('Student added succussfully', {author: 'Clint'})
        res.status(200).send(students);
    } else if (name === "") {
        rollbar.error('No name given')
        res.status(400).send("must provide a name.");
    } else {
        rollbar.error('Student already exists')
        res.status(400).send("that student already exists");
    }
    }
}