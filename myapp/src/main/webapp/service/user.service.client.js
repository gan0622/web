function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/jianyuan/users';
    var self = this;

    function findAllUsers() {
        return fetch(this.url)
            .then(response => response.json())
    }

    function findUserById(id) {
        return fetch(this.url + '/' + id)
            .then(response => response.json())
    }

    function createUser(user) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jianyuan/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }
    function updateUser(id, user) {
        return fetch(`https://wbdv-generic-server.herokuapp.com/api/jianyuan/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    function deleteUser(id) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jianyuan/users/' + id, {
            method: 'DELETE'
        })
    }
}

