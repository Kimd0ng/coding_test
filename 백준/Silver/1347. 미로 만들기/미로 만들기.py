n = int(input())

dir = [[1,0],[0,1],[-1,0],[0,-1]]
watch = 0
temp = [0,0]
min_x = 0
min_y = 0
visited = set()

visited.add((0,0))

commands = input()

for command in commands:
    if command == "R":
        watch = (watch - 1) % 4
    elif command == "L":
        watch = (watch + 1) % 4
    elif command == "F":
        x, y = temp
        dx, dy = dir[watch]
        
        visited.add((x + dx, y + dy))
        temp = [x + dx, y + dy]
        
        if min_x > x + dx:
            min_x = x + dx
        if min_y > y + dy:
            min_y = y + dy

new_visited = {(x + abs(min_x), y + abs(min_y)) for (x,y) in visited}

max_x = 0
max_y = 0
for (x, y) in new_visited:
    if max_x < x:
        max_x = x
    if max_y < y:
        max_y = y

graph = [[-1] * (max_y + 1) for _ in range(max_x + 1)]

for (x, y) in new_visited:
    graph[x][y] = "."

for i in range(max_x + 1):
    for j in range(max_y + 1):
        if graph[i][j] == -1:
            graph[i][j] = "#"

for row in graph:
    print("".join(row))