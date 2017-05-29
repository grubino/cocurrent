import json
import tempfile

import connexion

from services.flagset import set_data, get_data

def intersect_get():
    """
    intersect_get
    return sets and their labels

    :rtype: List[FlagSet]
    """
    return get_data()

progress = 0.0
def intersect_post(rows):
    """
    intersect_post
    upload csv file and aggregate into sets
    :param rows: records to intersect
    :type rows: werkzeug.datastructures.FileStorage

    :rtype: List[FlagSet]
    """
    global progress
    if (progress != 0.0 and progress != 100.0):
        return connexion.problem(400, 'No concurrent uploads', 'cannot upload csvs concurrently')

    rows.save('flags.csv')
    progress = 0.0
    with open('flags.csv', 'r') as f:
        set_data(f)
    return get_data()


def progress_get():
    """
    progress_get
    upload progress (NOT SAFE FOR CONCURRENCY)

    :rtype: InlineResponse200
    """
    global progress
    return json.dumps({'progress': progress})
