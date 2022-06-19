async function onFinish(event) {
    const user = {
        "userID": event.studentID,
        "password": event.password
    };
    console.log('user: ', user)
    const response = await axios.post('http://localhost:5000/user/login', user)
    const result = response.data;

    if (result.status === 'ok') {
        dispatch(login(result))
        localStorage.setItem("accessToken", true)
        message.success('Sign In success as role: ', result.role)
        navigate('/chatbot')
    } else {
        message.error(result.error)
    }
    form.resetFields()
};