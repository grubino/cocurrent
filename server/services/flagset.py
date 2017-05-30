from functools import reduce

import itertools
from typing import List

from swagger_server.models.flag_set import FlagSet
import pandas as pd
import numpy as np

from swagger_server.models.flag_set_dto import FlagSetDTO

DATA = []


def _check_label_set(k, label_set):
    if label_set is not None:
        return k in label_set
    else:
        return True


def _only_bools(i, row, label_set=None):
    bools_only = dict((k, v.lower() in {'true', 't', 'y'})
                      for k, v in row.items()
                      if _check_label_set(k, label_set) and v.lower() in {'true', 'false', 't', 'f', 'y', 'n', ''})
    bools_only['id'] = row.get('id', i)
    return bools_only


def _aggregate_label(acc, x):
    _id, label, val = x
    if val:
        acc[label] = (acc.get(label, []) + [_id])
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


def get_dataframe(rows) -> pd.DataFrame:
    df = pd.read_csv(rows)
    df.replace(to_replace=['[Tt](rue)?', '[Ff](alse)?', '[Yy]', '[Nn]', np.nan],
               value=[True, False, True, False, False],
               inplace=True,
               regex=True)
    bool_cols = [x for x, y in df.dtypes.iteritems() if y == 'bool']
    only_bool_df = df[bool_cols]
    only_bool_df['id'] = pd.Series(range(len(only_bool_df)))
    return only_bool_df


def set_data(rows):
    global DATA
    df = get_dataframe(rows)
    DATA = [x for x in _gen_rows([FlagSet(k, v)
                                  for k, v in zip(df.columns.values, [df[df[col] == True]['id']
                                                                      for col in df.columns.values if col != 'id'])])]


def get_data():
    return DATA


def get_venn_data(rows, labels):
    global DATA
    label_set = list(set(labels))
    df = get_dataframe(rows)[label_set+['id']]
    return [x for x in _gen_rows([FlagSet(k, v)
                                  for k, v in zip(df.columns.values, [df[df[col]]['id'].values
                                                                      for col in df.columns.values if col != 'id'])])]
