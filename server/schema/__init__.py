import graphene
from flask import g
from schema.partner import Partner
from data.partner import get_partner_of

from schema.proposal import Proposal
from data.proposal import get_proposals_of

from schema.target import Target
from data.target import get_targets_of
from schema.instruments import Hrs, Rss, Salticam, Bvit


class Query(graphene.ObjectType):

    partners = graphene.Field(graphene.List(Partner), partner_code=graphene.String())
    # investigator = graphene.Field(Investigator, investigator_id=graphene.Int(), semester_id=graphene.Int())

    proposals = graphene.Field(graphene.List(Proposal), partner_code=graphene.String(), semester=graphene.String(),
                               investigator_email=graphene.String(), proposal_code=graphene.String())
    targets = graphene.Field(graphene.List(Target), target_name=graphene.String(), proposal_code=graphene.String(),
                             semester=graphene.String())
    # proposal_code_list=graphene.String())  #Todo a list of proposal code should be considered

    @graphene.resolve_only_args
    def resolve_partners(self, **args):
        return get_partner_of(**args)

    # @graphene.resolve_only_args
    # def resolve_investigator(self, investigator_id, semester_id=None):
    #     return get_investigator_of(investigator_id, semester_id)

    @graphene.resolve_only_args
    def resolve_proposals(self, semester, **args):
        g.target_cache = {}
        return get_proposals_of(semester=semester, **args)

    @graphene.resolve_only_args
    def resolve_targets(self, semester, **args):
        """
        this method will return list of all targets in sdb and is any args are provided will return targets
        that meet **args request
        :param args: Targets filtering arguments
        :param semester:
        :return: list of targets
        """
        g.target_cache = {}
        return get_targets_of(semester=semester, **args)


schema = graphene.Schema(query=Query, types=[Rss, Hrs, Salticam, Bvit])