# coding: utf-8

from __future__ import absolute_import
from .base_model_ import Model
from datetime import date, datetime
from typing import List, Dict
from ..util import deserialize_model


class FlagSetDTO(Model):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    """
    def __init__(self, labels: List[str]=None, size: int=None):
        """
        FlagSetDTO - a model defined in Swagger

        :param labels: The labels of this FlagSetDTO.
        :type labels: List[str]
        :param size: The size of this FlagSetDTO.
        :type size: int
        """
        self.swagger_types = {
            'labels': List[str],
            'size': int
        }

        self.attribute_map = {
            'labels': 'labels',
            'size': 'size'
        }

        self._labels = labels
        self._size = size

    @classmethod
    def from_dict(cls, dikt) -> 'FlagSetDTO':
        """
        Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The FlagSetDTO of this FlagSetDTO.
        :rtype: FlagSetDTO
        """
        return deserialize_model(dikt, cls)

    @property
    def labels(self) -> List[str]:
        """
        Gets the labels of this FlagSetDTO.

        :return: The labels of this FlagSetDTO.
        :rtype: List[str]
        """
        return self._labels

    @labels.setter
    def labels(self, labels: List[str]):
        """
        Sets the labels of this FlagSetDTO.

        :param labels: The labels of this FlagSetDTO.
        :type labels: List[str]
        """

        self._labels = labels

    @property
    def size(self) -> int:
        """
        Gets the size of this FlagSetDTO.

        :return: The size of this FlagSetDTO.
        :rtype: int
        """
        return self._size

    @size.setter
    def size(self, size: int):
        """
        Sets the size of this FlagSetDTO.

        :param size: The size of this FlagSetDTO.
        :type size: int
        """

        self._size = size

