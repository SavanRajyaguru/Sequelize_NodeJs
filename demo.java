import java.util.PriorityQueue;

class demo{
    public static void main(String[] args) {
        int[] arr = {7, 10, 4 ,20, 15};
        
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for(int i = 0; i < arr.length; i++){
            pq.add(arr[i]);
            if(pq.size() > 3){
                pq.poll();  
            }
            System.out.println(pq);
        }
        System.out.println(pq.peek());
    }
}