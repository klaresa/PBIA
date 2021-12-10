# -*- coding: utf-8 -*-
"""Busca_Dijkstra.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1JrYllvU_5M9suGs7vpuvppYl5udaZyt6
"""

import numpy as np
import yaml

class Node:
  """
  Classe responsável por criar os nós da árvore.
  """

  def __init__(self,node_name='Start',parent=None,cost=0):
    
    self.name = node_name
    self.parent = parent
    self.cost = cost
    self.children = []

class Graph:
  """
  Classe responsável por realizar a busca dentro do grafo.
  """

  def __init__(self,map_name='map.yaml'):
    
    self.graph_dict = {}
    self.local_map = []

    # carregar o mapa a partir do arquivo
    with open(map_name,'r') as file:
      local_map = yaml.load(file)

    # criar o grafo a partir do mapa
    for start in local_map:
      for end in local_map[start]:
        if start in self.graph_dict:
          self.graph_dict[start].append([end, local_map[start][end]])
        else:
          self.graph_dict[start] = [[end, local_map[start][end]]]

  
  def get_path(self, start, end, tree=[], path=[], cost=0):

    # ratreando o caminho
    path = path + [start]

    # definir a condição de final de busca
    if start.name == end.name:
      end.parent = start.name 

      return path, cost

    # criar a estrutuda da árvore
    for n in self.graph_dict[start.name]:
      node = Node(node_name=n[0], parent=start, cost=n[1]+cost)
      tree.append([node, node.cost])

    # ordenando os possíveis nós para a busca
    tree = sorted(tree, key=lambda x:x[1], reverse=False)

    '''
    # imprimindo a estrutura da árvore
    print('Estrutura da árvore:')
    for i in range(len(tree)):
      print(f' * Local: {tree[i][0].name}, Custo: {tree[i][1]}')
    '''

    # selecionar o nó com menor custo
    next_node = tree.pop(0)

    # fazendo busca usando recursão
    tree, cost = self.get_path(next_node[0], end, tree=tree, path=path, cost=next_node[1])
    
    return tree, cost

# criar o objeto para busca
grafo = Graph()

# definir a origem e o destino da busca
inicio = "Toronto"
fim = "Mumbai"

# criando os objetos para a busca
no_inicio = Node(node_name=inicio)
no_fim = Node(node_name=fim)

# realizando a busca
arvore, custo = grafo.get_path(no_inicio,no_fim)

ultimo_no = arvore.pop()
caminho = []
while ultimo_no is not None:
  caminho.append(ultimo_no.name)
  ultimo_no = ultimo_no.parent

print(caminho[::-1], custo)