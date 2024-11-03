const diaryQueryKey = {
    all : ['diaries'],
    id: (id: string) => [...diaryQueryKey.all, id],
    date: (date: string) => [...diaryQueryKey.all, date],

}
export default diaryQueryKey