const collectionRefs = {

}

function dump() {
    const collections = Object.keys(collectionRefs).map(key => collectionRefs[key])
    console.log(collections)
}

const MockFirestore = {
    collection: name => {
        console.log('Getting collection ' + name)

        if (!collectionRefs[name]) {
            collectionRefs[name] = new MockCollectionRef(name)
        }

        dump()

        return collectionRefs[name]
    }
}

class MockCollectionRef {
    constructor(name) {
        this.name = name
        this.docRefs = {}
    }

    doc = name => {
        if (this.docRefs[name] == null) {
            this.docRefs[name] = new MockDocRef(name)
        }

        return this.docRefs[name]
    }

    // QuerySnapshot
    get = async () => {
        const docs = Object.keys(this.docRefs).map(key => this.docRefs[key].getSync())
        return {
            docs
        }
    }
}

class MockDocRef {
    constructor(name) {
        this.name = name
        this.dataObj = null
    }

    set = async data => {
        this.dataObj = data
    }

    // Doc snapshot
    get = async () => this.getSync()

    update = async data => this.dataObj = { ...this.dataObj, ...data }

    getSync = () => ({
        exists: this.dataObj != null,
        data: () => this.dataObj,
        dataObj: this.dataObj
    })
}

export default MockFirestore