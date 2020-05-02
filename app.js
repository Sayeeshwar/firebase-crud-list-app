let cafeList=document.getElementById('cafe-list')


let submit=document.getElementById('submit')
let form = document.getElementById('add-cafe-form')

submit.addEventListener('click',e=>{
    e.preventDefault();
    db.collection('cafes').add({
        name:form.name.value,
        location:form.location.value,
    })
    form.name.value=''
    form.location.value=''
})


function render(doc){
    //console.log(doc.data());
    let cafe=document.createElement('li');
    let name=document.createElement('span');
    let location = document.createElement('span');
    let del=document.createElement('div')


    name.textContent=doc.data().name;
    location.textContent=doc.data().location;
    del.textContent='X'
    cafe.setAttribute('data-id',doc.id)
    
    cafe.appendChild(name)
    cafe.appendChild(location)
    cafe.appendChild(del)
    cafeList.appendChild(cafe)


    del.addEventListener('click',e=>{
        e.stopPropagation()
        let elmt= e.target.parentElement.getAttribute('data-id')
        db.collection('cafes').doc(elmt).delete()
    })

}


/*db.collection('cafes').orderBy('location').orderBy('name').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        render(doc)
    })
})*/

db.collection('cafes').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    console.log(changes)
    changes.forEach(change=>{
        if(change.type=='added')
        {
            render(change.doc)
        }
        else if(change.type=='removed')
        {
            let elmt=cafeList.querySelector('[data-id='+"'"+change.doc.id+"'"+']')
            cafeList.removeChild(elmt)
        }
    })
})