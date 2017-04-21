import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import java.util.Iterator;

public class Assignment3 {

    public static String mode,input,output;

    public static class MyMapper0 extends Mapper<Object, Text, Text, DoubleWritable> {

        private final static DoubleWritable one = new DoubleWritable(1);

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

            String[] result = (value.toString()).split("\\s");
            for (int i = 0; i < result.length; i++) {
                context.write(new Text(result[i]), one);
            }
        }
    }

    public static class MyReducer0 extends Reducer<Text, DoubleWritable, Text, DoubleWritable> {

        private DoubleWritable result = new DoubleWritable();

        public void reduce(Text key, Iterable<DoubleWritable> values, Context context) throws IOException, InterruptedException {
            double counter = 0;

            for (DoubleWritable val : values) {
                counter += val.get();
            }

            result.set(counter);
            context.write(key, result);
        }
    }

    public static class MyMapper1 extends Mapper<Object, Text, Text, DoubleWritable> {

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

            String[] result = (value.toString()).split("\\s");
            for (int i = 0; i < result.length; i++) {
                if (Double.valueOf(result[i]) % 2 == 0) {
                    String s = "Even";
                    DoubleWritable value1 = new DoubleWritable(Double.parseDouble(result[i]));
                    context.write(new Text(s), value1);
                }
                else {
                    String s = "Odd";
                    DoubleWritable value1 = new DoubleWritable(Double.parseDouble(result[i]));
                    context.write(new Text(s), value1);
                }
            }
        }
    }

    public static class MyReducer1 extends Reducer<Text, DoubleWritable, Text, DoubleWritable> {

        private DoubleWritable result = new DoubleWritable();

        public void reduce(Text key, Iterable<DoubleWritable> values, Context context) throws IOException, InterruptedException {
            double maxVal = Integer.MIN_VALUE;

            Iterator<DoubleWritable> iterator = values.iterator();
            while (iterator.hasNext()) {
                double value = iterator.next().get();
                if (value > maxVal)
                {
                    maxVal = value;
                }
            }
            result.set(maxVal);
            context.write(key, result);
        }
    }

    public static class MyMapper2 extends Mapper<Object, Text, Text, DoubleWritable> {

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

            String[] result = (value.toString()).split("\\s");
            for (int i = 0; i < result.length; i++) {
                if (Double.valueOf(result[i]) % 2 == 0) {
                    String s = "Even";
                    DoubleWritable value1 = new DoubleWritable(Double.valueOf(result[i]));
                    context.write(new Text(s), value1);
                }
                else {
                    String s = "Odd";
                    DoubleWritable value1 = new DoubleWritable(Double.valueOf(result[i]));
                    context.write(new Text(s), value1);
                }
            }
        }
    }

    public static class MyReducer2 extends Reducer<Text, DoubleWritable, Text, DoubleWritable> {

        private DoubleWritable result = new DoubleWritable();

        public void reduce(Text key, Iterable<DoubleWritable> values, Context context) throws IOException, InterruptedException {
            double sum = 0.0;
            int counter = 0;

            Iterator<DoubleWritable> iterator = values.iterator();
            while (iterator.hasNext()) {
                double value = iterator.next().get();
                sum += (value * 1.0);
                counter++;
            }
            result.set(sum / counter);
            context.write(key, result);
        }
    }

    public static void main(String[] args) throws Exception {
        int index = 0;
        mode    = args[index++];
        input   = args[index++];
        output  = args[index];

        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Assignment3");

        if ( mode.equals("count") ) {
            job.setJarByClass(Assignment3.class);
            job.setMapperClass(MyMapper0.class);
            job.setReducerClass(MyReducer0.class);
            job.setOutputKeyClass(Text.class);
            job.setOutputValueClass(DoubleWritable.class);
            FileInputFormat.addInputPath(job, new Path(input));
            FileOutputFormat.setOutputPath(job, new Path(output));
            job.waitForCompletion(true);
        }
        else if( mode.equals("max") ){
            job.setJarByClass(Assignment3.class);
            job.setMapperClass(MyMapper1.class);
            job.setReducerClass(MyReducer1.class);
            job.setOutputKeyClass(Text.class);
            job.setOutputValueClass(DoubleWritable.class);
            FileInputFormat.addInputPath(job, new Path(input));
            FileOutputFormat.setOutputPath(job, new Path(output));
            job.waitForCompletion(true);
        }
        else if ( mode.equals("average") ) {
            job.setJarByClass(Assignment3.class);
            job.setMapperClass(MyMapper2.class);
            job.setReducerClass(MyReducer2.class);
            job.setOutputKeyClass(Text.class);
            job.setOutputValueClass(DoubleWritable.class);
            FileInputFormat.addInputPath(job, new Path(input));
            FileOutputFormat.setOutputPath(job, new Path(output));
            job.waitForCompletion(true);
        }
    }

}