const ProposalService = require('../services/proposal.service');

class ProposalController {
  static async getAllProposals(req, res, next) {
    try {
      const proposals = await ProposalService.getProposals(req.user.id);
      res.json(proposals);
    } catch (err) {
      next(err);
    }
  }

  static async getProposal(req, res, next) {
    try {
      const proposal = await ProposalService.getProposal(
        req.params.id,
        req.user.id
      );
      res.json(proposal);
    } catch (err) {
      next(err);
    }
  }

  static async createProposal(req, res, next) {
    try {
      const newProposal = await ProposalService.createProposal({
        ...req.body,
        user_id: req.user.id
      });
      res.status(201).json(newProposal);
    } catch (err) {
      next(err);
    }
  }

  static async updateProposal(req, res, next) {
    try {
      const updatedProposal = await ProposalService.updateProposal(
        req.params.id,
        req.body,
        req.user.id
      );
      res.json(updatedProposal);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProposal(req, res, next) {
    try {
      await ProposalService.deleteProposal(req.params.id, req.user.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProposalController;