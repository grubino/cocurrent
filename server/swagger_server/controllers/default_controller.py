import tempfile

import connexion

from services.flagset import set_data, get_data
from swagger_server.models.flag_set import FlagSet
from datetime import date, datetime
from typing import List, Dict
from six import iteritems
from ..util import deserialize_date, deserialize_datetime
import csv

def intersect_get():
    """
    intersect_get
    return sets and their labels

    :rtype: List[FlagSet]
    """
    return get_data()


def intersect_post(rows):
    """
    intersect_post
    upload csv file and aggregate into sets
    :param rows: records to intersect
    :type rows: werkzeug.datastructures.FileStorage

    :rtype: List[FlagSet]
    """

    rows.save('flags.csv')
    with open('flags.csv', 'r') as f:
        set_data(f)
    return get_data()
