import math
import os
import random
import re
import sys


import math
import os
import random
import re
import sys


def getNoRepeatSegments(s):
    ans = len(s) + 1
    for i in range(26):
        target = chr(ord('a') + i)
        count = 0
        seen_mask = 0
        started = False
        for char in s:
            if char == target:
                continue
            char_bit = 1 << (ord(char) - ord('a'))
            if not started:
                count = 1
                started = True
                seen_mask = char_bit
            elif seen_mask & char_bit:
                count += 1
                seen_mask = char_bit
            else:
                seen_mask |= char_bit
       
        current_count = count if started else 0
        if current_count < ans:
            ans = current_count
    return ans


if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')
    s = input()
    result = getNoRepeatSegments(s)
    fptr.write(str(result) + chr(10))
write that code
    fptr.close()
    ans = len(s) + 1
    for i in range(26):
        target = chr(ord('a') + i)
        count = 0
        seen_mask = 0
        started = False
        for char in s:
            if char == target:
                continue
            char_bit = 1 << (ord(char) - ord('a'))
            if not started:
                count = 1
                started = True
                seen_mask = char_bit
            elif seen_mask & char_bit:
                count += 1
                seen_mask = char_bit
            else:
                seen_mask |= char_bit
       
        current_count = count if started else 0
        if current_count < ans:
            ans = current_count
    return ans


if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')
    s = input()
    result = getNoRepeatSegments(s)
    fptr.write(str(result) + chr(10))
    fptr.close()



import os

def countUniqueSubstrings(text):
ans = 0
left - 0
seen = (}
for right, char in enumerate(text):
if char in seen and seen[char] >- left:
left = seen[char] + 1
seen[char] = right
ans += (right - left + 1)
return ans

== ' main ':
fptr = open(os.environ['OUTPUT_PATH'], 'w')
text - input()
result = countUniqueSubstrings(text)
fptr.write(str(result) + chr(10))
fptr.close()

if

name
