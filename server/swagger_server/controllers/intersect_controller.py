import connexion

from services.flagset import set_data, get_data, get_venn_data

def intersect_get(labels):
    """
    intersect_get
    return sets and their labels
    :param labels: labels for which to generate intersections
    :type labels: List[str]

    :rtype: List[FlagSetDTO]
    """
    if len(labels):
        with open('flags.csv') as f:
            return get_venn_data(f, labels)
    else:
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

