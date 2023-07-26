const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

// TODO: npm i bcrypt on post route, 

// Getting All ** Would never need for user profile **

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find()
        res.json(profiles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Getting One
router.get('/:id', getProfile, (req, res) => {
    res.json(res.profile)
})


// Creating One
router.post('/', async (req, res) => {
    const profile = new Profile({
        name: req.body.name,
    })

    try {
        const newProfile = await profile.save()
        res.status(201).json(newProfile)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Updating One
router.patch('/:id', getProfile, async (req, res) => {
    if (req.body.name !== null) {
        res.profile.name = req.body.name
    }
    if (req.body.time !== null) {
        res.profile.time = req.body.time
    }
    if (req.body.words !== null) {
        res.profile.words = req.body.words
    }

    try {
        const updatedProfile = await res.profile.save()
        res.json(updatedProfile)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }



})

// Deleting One
router.delete('/:id', getProfile, async (req, res) => {
    try {
        await res.profile.deleteOne0()
        res.json({message: 'Deleted Profile'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getProfile(req, res, next) {
    let profile
    try {
        profile = await Profile.findById(req.params.id)
        if (profile === null) {
            return res.status(404).json({ message: 'Cannot find profile' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    res.profile = profile
    next()
}





module.exports = router