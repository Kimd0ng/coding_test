from sys import stdin as s

n = int(s.readline())

stack = []

def stack_status(line):
    match line[0]:
        case "push":
            stack.append(line[1])
            return
        case "pop":
            if stack:
                return print(stack.pop())
            else:
                return print(-1)
        case "size":
            return print(len(stack))
        case "empty":
            if stack:
                return print(0)
            else:
                return print(1)
        case "top":
            if stack:
                return print(stack[len(stack) - 1])
            else:
                return print(-1)

for _ in range(n):
    line = s.readline().split()
    stack_status(line)

