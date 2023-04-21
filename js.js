let perPage = 6
let currentPage = 1
let start = 0
let end = perPage
const btnNext = document.querySelector('#active-2')
const btnReturn = document.querySelector('#active-1')
function resetInput() {
    document.getElementById('fullname').value = ''
    document.getElementById('email').value = ''
    document.getElementById('phone').value = ''
    document.getElementById('address').value = ''
}

function save() {
    let fullname = document.getElementById('fullname').value 
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let address = document.getElementById('address').value
    let gender = ''
    if(document.getElementById('male').checked) {
        gender = document.getElementById('male').value
    } else if (document.getElementById('famale').checked) {
        gender = document.getElementById('famale').value
    }

    if(_.isEmpty(fullname)) {
        fullname = ''
        document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ tên'
    } else {
        document.getElementById('fullname-error').innerHTML = ''
    }

    if(_.isEmpty(email)) {
        email = ''
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email'
    } else {
        document.getElementById('email-error').innerHTML = ''
    }

    if(_.isEmpty(phone)) {
        phone = ''
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập sđt'
    } else {
        document.getElementById('phone-error').innerHTML = ''
    }

    if(_.isEmpty(address)) {
        address = ''
        document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ'
    } else {
        document.getElementById('address-error').innerHTML = ''
    }

    if(_.isEmpty(gender)) {
        gender = ''
        document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính'
    } else {
        document.getElementById('gender-error').innerHTML = ''
    }

    if(fullname && email && phone && address && gender) {
        let students = localStorage.getItem('students') ? JSON.parse( localStorage.getItem('students')) : []
        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        });
        localStorage.setItem('students', JSON.stringify(students))
        this.renderStudent()
        resetInput()
    }
}

// let currentPage = 1
// let perPage = 2
// let students = localStorage.getItem('students') ? JSON.parse( localStorage.getItem('students')) : []
// let totalPage = students.length / 2
// let perUser = []

// function handlePageNumber(index) {
//     currentPage = index
//     perUser = students.slice(
//         (currentPage - 1) * perPage,
//         (currentPage - 1) * perPage + perPage,
//     )
//     renderStudent()
// }

// function renderPageNumber() {
//     totalPage = students.length / perPage
//     for(let i = 1; i <= totalPage; i++) {
//         document.getElementById('pagination').innerHTML += `<a href ="#" onclick="handlePageNumber(${i})">${i}</a>`
//     }
// }

function renderStudent() {
    let students = localStorage.getItem('students') ? JSON.parse( localStorage.getItem('students')) : []
    if(students.length == 0) {
        document.getElementById('grid-students').style.display = 'none'
    }
    document.getElementById('grid-students').style.display='block'
    // perUser = students.slice(
    //     (currentPage - 1) * perPage,
    //     (currentPage - 1) * perPage + perPage,
    // )
    // renderPageNumber()
    let tableContent = `<tr>
            <td width="50px" align="center"> # </td>
            <td width="100px" align="center">Họ tên</td>
            <td width="100px" align="center">Email</td>
            <td width="100px" align="center">Điện thoại</td>
            <td width="150px" align="center">Địa chỉ</td>
            <td width="100px" align="center">Hành động</td>
            <td width="100px" align="center">Giới tính</td>
        </tr>`

        students.forEach((student,index) => {
            let studentId = index
            let gengen = student.gender == 1 ? 'Nam' : 'Nữ'
            if (index >= start && index < end) {
                tableContent += `<tr>
                <td align = "center">${index + 1}</td>
                <td align = "center">${student.fullname}</td>
                <td align = "center">${student.email}</td>
                <td align = "center">${student.phone}</td>
                <td align = "center">${student.address}</td>
                <td>
                    <a href ="#" onclick="editStudent(${studentId})">Edit</a>
                    <a href ="#" onclick='deleteStudent(${studentId})'>Delete</a>
                </td>
                <td align = "center" >${gengen}</td>
            </tr>`
            }
        })

        document.getElementById('grid-students').innerHTML = tableContent
}

renderStudent() 

btnNext.addEventListener('click', () => {
    currentPage++
    start = (currentPage - 1) * perPage
    end = currentPage * perPage
    renderStudent() 
})

btnReturn.addEventListener('click', () => {
    currentPage = 1
    start = (currentPage - 1) * perPage
    end = currentPage * perPage
    renderStudent() 
})

function editStudent(index) {
    // console.log(index)
    let students = localStorage.getItem('students') ? JSON.parse( localStorage.getItem('students')) : []
    document.getElementById('fullname').value = students[index].fullname
    document.getElementById('email').value = students[index].email
    document.getElementById('phone').value = students[index].phone
    document.getElementById('address').value = students[index].address
    document.getElementById('more').value = index
    document.getElementById('save').style.display = 'none'
    document.getElementById('update').style.display = 'block'
}

function update() {
    let students = localStorage.getItem('students') ? JSON.parse( localStorage.getItem('students')) : []
    let index = document.getElementById('more').value
    students[index] = {
        fullname:  document.getElementById('fullname').value,
        email:  document.getElementById('email').value,
        address:  document.getElementById('address').value,
        phone:  document.getElementById('phone').value
    }
    localStorage.setItem('students', JSON.stringify(students))
    document.getElementById('save').style.display = 'block'
    document.getElementById('update').style.display = 'none'
    renderStudent()
    resetInput()

}

function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse( localStorage.getItem('students')) : []
    if(confirm('Ban co thuc su muon xoa khong?')) {
        students.splice(id, 1)
    }
    localStorage.setItem('students', JSON.stringify(students))
    renderStudent()
}

