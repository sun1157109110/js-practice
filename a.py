# # n=int(input())
# # nums = input().split(' ')
# # odd = even =1
# # for i in range(n):
# #   nums[i] = int(nums[i])
# #   if i%2:
# #     odd = max(odd,nums[i])
# #   else:
# #     even=max(even,nums[i])
# # res = 0
# # if odd == even:
# #   odd+=1
# # for i in range(n):
# #   if i%2:
# # #     res+=odd - nums[i]
# #     if odd != nums[i]:
# #         res+=1
# #   else:
# # #     res+=even - nums[i]
# #     if even != nums[i]:
# #         res+=1
# # print(res)
# # line = input().split(' ')
# # len = int(line[0])
# # t = int(line[1])
# # arr = input().split(' ')
# # for i in range(len):
# #   arr[i] = int(arr[i])
# # arr.sort(reverse=True)
# # res = 0
# # for i in range(0,len):
# #   for j in range(i+1,len):
# #     if arr[i] * arr[j]>=t:
# #       res += 1
# #     else:
# #       break
# # print(res*2)

# # import sys
# # sys.setrecursionlimit(int(1e9))
# # n = int(input())
# # S = input()
# # arr = [[] for _ in range(n)]
# # R, G, B = 0, 0, 0
# # for s in S:
# #     if s == "r":
# #         R += 1
# #     elif s == "g":
# #         G += 1
# #     elif s == "b":
# #         B += 1
# # for _ in range(n - 1):
# #     a, b = map(int, input().split())
# #     a, b = a - 1, b - 1
# #     arr[a].append(b)
# #     arr[b].append(a)


# # def dfs(node: int, parent: int):
# #     global ans

# #     sub_r, sub_g, sub_b = 0, 0, 0
# #     for child in arr[node]:
# #         if child == parent:
# #             continue
# #         child_r, child_g, child_b = dfs(child, node)
# #         sub_r += child_r

# #         sub_g += child_g

# #         sub_b += child_b
# #         if child_r > 0 and child_g > 0 and child_b > 0:

# #             parent_r, parent_g, parent_b = R - child_r, G - child_g, B - child_b
# #             if parent_r > 0 and parent_g > 0 and parent_b > 0:
# #                 ans += 1
# #     if S[node] == "r":
# #         sub_r += 1
# #     elif S[node] == "g":
# #         sub_g += 1
# #     else:
# #         sub_b += 1
# #     return sub_r, sub_g, sub_b


# # ans = 0
# # dfs(0, -1)
# # print(ans)
# import sys

# sys.setrecursionlimit(int(1e9))
# n = int(input())
# S = input()
# graph = [[] for _ in range(n)]
# R, G, B = 0, 0, 0
# for char in S:
#     if char == "r":
#         R += 1
#     elif char == "g":
#         G += 1
#     elif char == "b":
#         B += 1
# for _ in range(n - 1):
#     a, b = map(int, input().split())
#     a, b = a - 1, b - 1
#     graph[a].append(b)
#     graph[b].append(a)


# def dfs(root: int, parent: int):
#     global ans

#     sub_r, sub_g, sub_b = 0, 0, 0
#     for child in graph[root]:
#         if child == parent:
#             continue
#         child_r, child_g, child_b = dfs(child, root)
#         sub_r += child_r
#         sub_g += child_g
#         sub_b += child_b
#         if child_r > 0 and child_g > 0 and child_b > 0:
#             parent_r, parent_g, parent_b = R - child_r, G - child_g, B - child_b
#             if parent_r > 0 and parent_g > 0 and parent_b > 0:
#                 ans += 1
#     if S[root] == "r":
#         sub_r += 1
#     elif S[root] == "g":
#         sub_g += 1
#     else:
#         sub_b += 1
#     return sub_r, sub_g, sub_b


# ans = 0
# dfs(0, -1)
# print(ans)

# If you need to import additional packages or classes, please import here.
# from collections import defaultdict
# from heapq import heappop, heappush
# def func():
#     INF = int(1e18)
#     D = int(input())  
#     N = int(input())  
#     sssstops = {}
#     point___sssss = [0]
#     dist = defaultdict(lambda: INF) 
#     for _ in range(N):
#         pos, wait = map(int, input().split())
#         sssstops[pos] = wait + 1  
#         point___sssss.append(pos)
#     point___sssss.append(D)
#     pq = [(0, 0, 1000)]
#     while pq:
#         cur_cost, c___id, cur_fuel = heappop(pq)
#         if c___id == len(point___sssss) - 1:
#             print(int(cur_cost)) 
#             exit(0)
#         if cur_cost > dist[(c___id, cur_fuel)]:
#             continue
#         if point___sssss[c___id] in sssstops:
#             time = sssstops[point___sssss[c___id]]
#             if time + cur_cost < dist[(c___id, 1000)]:
#                 dist[(c___id, 1000)] = time + cur_cost
#                 heappush(pq, (time + cur_cost, c___id, 1000))
#         weight = point___sssss[c___id + 1] - point___sssss[c___id]
#         if cur_fuel - weight >= 0:
#             nextFuel = cur_fuel - weight
#             if cur_cost + weight / 100 < dist[(c___id, nextFuel)]:
#                 dist[(c___id, nextFuel)] = cur_cost + weight / 100
#                 heappush(pq, (cur_cost + weight / 100, c___id + 1, nextFuel))

#     print(-1)
    
   
# if __name__ == "__main__":
#     func()
# from collections import defaultdict, deque
# from typing import DefaultDict, Set, Tuple

# INF = int(1e18)

# n, m = map(int, input().split())
# graph = defaultdict(set)
# for _ in range(m):
#     a, b, w = map(int, input().split())
#     graph[b].add((a - 1, -w))


# for i in range(1, n + 1):
#     graph[i - 1].add((i, 0))
#     graph[i].add((i - 1, -1))


# def fnn(n: int, adjMap: DefaultDict[int, Set[Tuple[int, int]]]):
#     """fnn求单源最长路,顺便判断正环"""
#     dist = defaultdict(lambda: -INF)
#     dist[n] = 0
#     queue = deque([n])
#     count = [0] * (n + 1)
#     isInqueue = [False] * (n + 1)
#     isInqueue[0] = True
#     while queue:
#         cur = queue.popleft()
#         isInqueue[cur] = False

#         for next, weight in adjMap[cur]:
#             if dist[cur] + weight > dist[next]:
#                 dist[next] = dist[cur] + weight
#                 count[next] = count[cur] + 1
#                 if count[next] >= n + 1:
#                     return False, []
#                 if not isInqueue[next]:
#                     isInqueue[next] = True
#                     if queue and dist[next] > dist[queue[0]]:
#                         queue.appendleft(next)
#                     else:
#                         queue.append(next)

#     return True, dist


# ok, dist = fnn(n, graph)
# if not ok:
#     print(-1)
# else:
#     print(-dist[0])
s = input()
n = len(s)
y = [True] * n
S = []
map1 = {"(": ")", "[": "]", "{": "}"}
map2 = {")": "(", "]": "[", "}": "{"}
for i, char in enumerate(s):
    if char in map2:
        if not S or s[S[-1]] != map2[char]:
            y[i] = False
        else:
            S.pop()
    else:
        S.append(i)

for i in S:
    y[i] = False


for i, flag in enumerate(y):
    if not flag:
        if s[i] in map2:
            print(f"{map2[s[i]]},{i+1}")
        else:
            print(f"{map1[s[i]]},{i+2}")