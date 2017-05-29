from functools import reduce

import itertools
from typing import List

from swagger_server.models.flag_set import FlagSet
import csv

from swagger_server.models.flag_set_dto import FlagSetDTO

DATA = []


def _only_bools(i, row):
    bools_only = dict((k, v.lower() in {'true', 't', 'y'})
                      for k, v in row.items() if v.lower() in {'true', 'false', 't', 'f', 'y', 'n'})
    bools_only['id'] = row.get('id', i)
    return bools_only


def _add_label(acc, x):
    for k in [key for key in x.keys() if key != 'id']:
        if x[k]:
            if k in acc:
                acc[k] = list(set([x['id']] + acc[k]))
            else:
                acc[k] = [x['id']]
    return acc


def _gen_rows(flags: List[FlagSet], n=2):
    def _combine_rows(acc: FlagSet, x: FlagSet):
        l = ' & '.join([acc.label, x.label])
        membs = list(set(acc.members) & set(x.members))
        return FlagSet(l, membs)

    for i in range(1, n+1):
        for c in itertools.combinations(flags, i):
            if len(c) > 1:
                flag_set = reduce(_combine_rows, c[1:], c[0])
                yield FlagSetDTO(flag_set.label.split(' & '), len(flag_set.members))
            else:
                yield FlagSetDTO(c[0].label.split(' & '), len(c[0].members))


def set_data(rows):
    global DATA
    DATA = [x for x in _gen_rows([FlagSet(k, v)
                                  for k, v in reduce(_add_label, (_only_bools(i, row)
                                                                  for i, row in enumerate(csv.DictReader(rows))),
                                                     {}).items()]) if x.size > 0]


def get_data():
    return DATA