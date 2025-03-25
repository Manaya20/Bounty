const express = require('express');
const router = express.Router();
const ProposalController = require('../controllers/proposal.controller');

router.get('/', ProposalController.getAllProposals);
router.get('/:id', ProposalController.getProposal);
router.post('/', ProposalController.createProposal);
router.put('/:id', ProposalController.updateProposal);
router.delete('/:id', ProposalController.deleteProposal);

module.exports = router;