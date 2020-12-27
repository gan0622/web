(function () {

    let tbody;
    let template;
    let clone;
    let $createBtn;
    let $usernameFld;
    let $passwordFld;
    let $firstNameFld;
    let $lastNameFld;
    let $emailFld;
    let $roleFld;
    const userService = new AdminUserServiceClient();

    let selectedUserIndex = -1;
    const main = () => {
        tbody = $("tbody");
        template = $("tr.wbdv-template");

        $createBtn = $(".wbdv-create").click(createUser);

        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");
        $emailFld = $("#emailFld");
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");

        $(".wbdv-update").click(updateUser).click(function () {
            $('.alert').show()
        });

        userService.findAllUsers()
            .then((_users) => {
                console.log(_users);
                users = _users;
                renderUsers(users)
            });

    };
    $(main);


    const createUser = () => {
        const username = $usernameFld.val();
        const password = $passwordFld.val();
        const firstName = $firstNameFld.val();
        const lastName = $lastNameFld.val();
        const userRole = $roleFld.val();
        const userEmail = $emailFld.val();

        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld.val("");
        $emailFld.val("");

        const newUser = {
            username: username,
            password: password,
            first: firstName,
            last: lastName,
            role: userRole,
            email: userEmail,
        };

        userService.createUser(newUser)
            .then(actualNewUser => {
                users.push(actualNewUser);
                renderUsers(users)
            })
    };


    const findAllUsers = () => {
        userService.findAllUsers().then(renderUsers)
    };


    const findUserById = () => {
        renderUser(userService.findUserById(id))
    };


    const updateUser = () => {
        const newUsername = $("#usernameFld").val();
        const newPassword = $("#passwordFld").val();
        const newFirstName = $("#firstNameFld").val();
        const newLastName = $("#lastNameFld").val();
        const newEmail = $("#emailFld").val();
        const newRole = $("#roleFld").val();
        const userId = users[selectedUserIndex]._id;
        userService.updateUser(userId, {
            username: newUsername,
            password: newPassword,
            first: newFirstName,
            last: newLastName,
            email: newEmail,
            role: newRole
        })
            .then(response => {
                users[selectedUserIndex].username = newUsername;
                users[selectedUserIndex].password = newPassword;
                users[selectedUserIndex].first = newFirstName;
                users[selectedUserIndex].last = newLastName;
                users[selectedUserIndex].role = newRole;
                users[selectedUserIndex].email = newEmail;
                renderUsers(users)
            });
        clearFields()
    };


    function clearFields() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $emailFld.val("");
        $roleFld.val("")
    }


    const deleteUser = (_index) => {
        const user = users[_index];
        const userId = user._id;
        userService.deleteUser(userId)
            .then(response => {
                users.splice(_index, 1);
                renderUsers(users)
            })
    };


    const renderUser = (user) => {

        $usernameFld.val(user.username);
        $passwordFld.val(user.password);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
        $emailFld.val(user.email);
        $roleFld.val(user.role);

    };


    const selectUser = (index) => {
        selectedUserIndex = index;
        $("#usernameFld").val(users[index].username);
        $("#passwordFld").val(users[index].password);
        $("#firstNameFld").val(users[index].first);
        $("#lastNameFld").val(users[index].last);
        $("#emailFld").val(users[index].email);
        $("#roleFld").val(users[index].role);
    };

    /**
     *  Accepts an array of user instances, clears the current content of the table body,
     *  iterates over the array of users, clones a table row template for each user instance,
     *  populates the table row with the user object properties, adds the table row to
     *  the table body.
     */
    const renderUsers = (users) => {
        tbody.empty();
        const ul = $("<ul>");
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const li = $("<li>" + user.username + "</li>");
            ul.append(li);

            clone = template.clone();
            clone.removeClass("wbdv-hidden");

            clone.find(".wbdv-username").html(user.username);
            clone.find(".wbdv-password").html("****");

            clone.find(".wbdv-first-name").html(user.first);
            clone.find(".wbdv-last-name").html(user.last);
            clone.find(".wbdv-email").html(user.email);
            clone.find(".wbdv-role").html(user.role);

            clone.find(".wbdv-remove").click(() => deleteUser(i));
            clone.find(".wbdv-edit").click(() => selectUser(i));

            tbody.append(clone)
        }
    };

})();