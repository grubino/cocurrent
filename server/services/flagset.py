from functools import reduce

from swagger_server.models.flag_set import FlagSet
import csv

DATA = []


def _only_bools(row):
    bools_only = dict((k, v.lower() == 'true') for k, v in row.items() if v.lower() in {'true', 'false'})
    bools_only['id'] = row['id']
    return bools_only


def _add_label(acc, x):
    for k in [key for key in x.keys() if key != 'id']:
        if x[k]:
            if k in acc:
                acc[k] = list(set([x['id']] + acc[k]))
            else:
                acc[k] = [x['id']]
    return acc


def set_data(rows):
    global DATA
    _DATA = [_only_bools(row) for row in csv.DictReader(rows)]
    DATA = [FlagSet(k, v) for k, v in reduce(_add_label, _DATA, {}).items()]


def get_data():
    return DATA