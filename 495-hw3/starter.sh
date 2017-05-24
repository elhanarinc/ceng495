#!/bin/bash

/usr/local/hadoop/bin/hadoop com.sun.tools.javac.Main *.java &
wait $!

jar cf hw3.jar *.class
wait $!

/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 count ../inputs/input1.txt output1task1 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 max ../inputs/input1.txt output1task2 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 average ../inputs/input1.txt output1task3 2>/dev/null &
wait $!
echo 'Input1 is done.'

/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 count ../inputs/input2.txt output2task1 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 max ../inputs/input2.txt output2task2 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 average ../inputs/input2.txt output2task3 2>/dev/null &
wait $!
echo 'Input2 is done.'

/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 count ../inputs/input3.txt output3task1 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 max ../inputs/input3.txt output3task2 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 average ../inputs/input3.txt output3task3 2>/dev/null &
wait $!
echo 'Input3 is done.'

/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 count ../inputs/input4.txt output4task1 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 max ../inputs/input4.txt output4task2 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 average ../inputs/input4.txt output4task3 2>/dev/null &
wait $!
echo 'Input4 is done.'

/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 count ../inputs/input5.txt output5task1 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 max ../inputs/input5.txt output5task2 2>/dev/null &
wait $!
/usr/local/hadoop/bin/hadoop jar hw3.jar Assignment3 average ../inputs/input5.txt output5task3 2>/dev/null &
wait $!
echo 'Input5 is done.'

rm -rf *.class *.jar

cat output1task1/* > result1_task1.txt &
wait $!
cat output1task2/* > result1_task2.txt &
wait $!
cat output1task3/* > result1_task3.txt &
wait $!

cat output2task1/* > result2_task1.txt &
wait $!
cat output2task2/* > result2_task2.txt &
wait $!
cat output2task3/* > result2_task3.txt &
wait $!

cat output3task1/* > result3_task1.txt &
wait $!
cat output3task2/* > result3_task2.txt &
wait $!
cat output3task3/* > result3_task3.txt &
wait $!

cat output4task1/* > result4_task1.txt &
wait $!
cat output4task2/* > result4_task2.txt &
wait $!
cat output4task3/* > result4_task3.txt &
wait $!

cat output5task1/* > result5_task1.txt &
wait $!
cat output5task2/* > result5_task2.txt &
wait $!
cat output5task3/* > result5_task3.txt &
wait $!

mkdir student_results
mv result* student_results

rm -rf o*

GRADE=0
NUMBER=$1

diff student_results/result1_task1.txt ../outputs/result1_task1.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result1_task2.txt ../outputs/result1_task2.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result1_task3.txt ../outputs/result1_task3.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+8))
fi

diff student_results/result2_task1.txt ../outputs/result2_task1.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result2_task2.txt ../outputs/result2_task2.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result2_task3.txt ../outputs/result2_task3.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+8))
fi

diff student_results/result3_task1.txt ../outputs/result3_task1.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result3_task2.txt ../outputs/result3_task2.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result3_task3.txt ../outputs/result3_task3.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+8))
fi

diff student_results/result4_task1.txt ../outputs/result4_task1.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result4_task2.txt ../outputs/result4_task2.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result4_task3.txt ../outputs/result4_task3.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+8))
fi

diff student_results/result5_task1.txt ../outputs/result5_task1.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result5_task2.txt ../outputs/result5_task2.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+6))
fi

diff student_results/result5_task3.txt ../outputs/result5_task3.txt | awk '$0=">"$0'
d=${PIPESTATUS[0]}
if [ $d -eq 0 ]; then
    GRADE=$((GRADE+8))
fi

destdir=../results.txt

if [ -f "$destdir" ]; then
    echo $NUMBER $GRADE >> ../results.txt
else
    touch ../results.txt
    echo $NUMBER $GRADE >> ../results.txt
fi
echo 'Jobs are done.'